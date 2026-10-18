/* ==========================================================
   Mykha Lizette Floresca — Flower Patch Portfolio
   SITE CODE: garden layout & swiping, cursor parallax, fireflies,
   sign panels, gallery filters, artwork viewer, series pages.
   Content comes from portfolio-data.js (loaded first).
   ========================================================== */

(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const garden = document.getElementById('garden');
  const layers = [...document.querySelectorAll('#scene-stage .layer')].map(g => ({ g, d: +g.dataset.d, x: 0, y: 0 }));
  const lite = document.documentElement.classList.contains('lite');
  const light = document.getElementById('cursor-light');
  const hint = document.getElementById('hint');
  const sceneStage = document.getElementById('scene-stage');
  const coarse = matchMedia('(pointer: coarse)').matches;
  let inGarden = false;

  /* ---------- layout: wide screens see everything, tall screens pan ---------- */
  let portrait = false, panX = 0, panTarget = 0, panMax = 0, panVel = 0, panFrac = 0.79;
  function layout() {
    const was = portrait;
    portrait = innerWidth / innerHeight < 1.25;
    document.documentElement.classList.toggle('portrait', portrait);
    if (portrait) {
      const h = innerHeight * 1.06, w = h * 16 / 9;
      Object.assign(sceneStage.style, { width: w + 'px', height: h + 'px', left: '0px', top: (-innerHeight * .03) + 'px' });
      panMax = Math.max(0, w - innerWidth);
      // start centred on the person writing (≈79% across the scene)
      panTarget = panX = Math.min(panMax, Math.max(0, w * panFrac - innerWidth / 2));
      sceneStage.style.transform = `translate3d(${-panX}px,0,0)`;
    } else if (was) {
      Object.assign(sceneStage.style, { width: '', height: '', left: '', top: '', transform: '' });
    }
  }
  layout();
  addEventListener('resize', layout);
  function showHint() {
    hint.textContent = portrait ? 'swipe to look around' : 'pick a sign to explore';
    setTimeout(() => hint.classList.add('show'), 1800);
    setTimeout(() => hint.classList.remove('show'), portrait ? 6000 : 7000);
  }

  /* ---------- swipe to pan (tall screens) ---------- */
  let dragId = null, dragX0 = 0, pan0 = 0, lastX = 0, lastT = 0, dragged = false;
  garden.addEventListener('pointerdown', e => {
    dragged = false;
    if (!portrait || e.target.closest('.mnav')) return;
    dragId = e.pointerId; dragX0 = lastX = e.clientX; lastT = performance.now();
    pan0 = panTarget; panVel = 0; dragged = false;
  });
  addEventListener('pointermove', e => {
    if (e.pointerId !== dragId) return;
    const dx = e.clientX - dragX0;
    if (Math.abs(dx) > 8) dragged = true;
    const now = performance.now();
    panVel = -(e.clientX - lastX) / Math.max(1, now - lastT) * 16;
    lastX = e.clientX; lastT = now;
    panTarget = Math.min(panMax, Math.max(0, pan0 - dx));
  });
  const endDrag = e => { if (e.pointerId === dragId) dragId = null; };
  addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);
  // a swipe that ends on a sign shouldn't count as tapping it
  garden.addEventListener('click', e => { if (dragged && !e.target.closest('.mnav')) { e.stopPropagation(); e.preventDefault(); dragged = false; } }, true);

  /* ---------- open straight into the garden (soft fade-in) ---------- */
  inGarden = true;
  document.documentElement.classList.add('in-garden');
  requestAnimationFrame(() => garden.classList.add('awake'));
  showHint();

  /* ---------- camera follows the cursor (parallax) ---------- */
  let tx = 0, ty = 0, cx = 0, cy = 0, lastMove = -1e9, mouseX = innerWidth / 2, mouseY = innerHeight / 2;
  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    tx = (e.clientX / innerWidth - .5) * 2;
    ty = (e.clientY / innerHeight - .5) * 2;
    mouseX = e.clientX; mouseY = e.clientY;
    lastMove = performance.now();
    light.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;   // glow sits right on the cursor
    light.classList.add('on');
  });
  document.addEventListener('pointerleave', () => { tx = ty = 0; light.classList.remove('on'); });

  // How far each layer can travel, in drawing units (scene is 1920 wide); converted to px
  const RANGE_X = 46, RANGE_Y = 26;
  let unit = 1;
  const measure = () => { unit = Math.max(sceneStage.clientWidth / 1920, sceneStage.clientHeight / 1080); };
  measure(); addEventListener('resize', measure);

  /* ---------- fireflies / dust motes ---------- */
  const canvas = document.getElementById('motes');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1, motes = [];
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 64;
  { const s = sprite.getContext('2d'); const gr = s.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,248,200,1)'); gr.addColorStop(.25, 'rgba(255,220,130,.75)');
    gr.addColorStop(1, 'rgba(255,180,80,0)'); s.fillStyle = gr; s.fillRect(0, 0, 64, 64); }
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, coarse ? 1.5 : 2);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(lite ? 16 : 46, (W * H) / (lite ? 52000 : 38000)));
    motes = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: H * (.15 + Math.random() * .8),
      r: 4 + Math.random() * 10, vx: (Math.random() - .5) * .25, vy: -.08 - Math.random() * .2,
      ph: Math.random() * 6.28, sp: .6 + Math.random() * 1.4, d: .4 + Math.random() * .7
    }));
  }
  resize(); addEventListener('resize', resize);

  function drawMotes(t, ox, oy) {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (const m of motes) {
      m.x += m.vx + Math.sin(t * .0004 * m.sp + m.ph) * .25;
      m.y += m.vy + Math.cos(t * .0005 * m.sp + m.ph) * .15;
      if (m.y < -20) { m.y = H + 20; m.x = Math.random() * W; }
      if (m.x < -20) m.x = W + 20; else if (m.x > W + 20) m.x = -20;
      const a = .25 + .75 * Math.max(0, Math.sin(t * .0012 * m.sp + m.ph));
      ctx.globalAlpha = a * .8;
      const s = m.r * 2;
      ctx.drawImage(sprite, m.x - ox * m.d - m.r, m.y - oy * m.d - m.r, s, s);
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- main loop ---------- */
  let lastMote = 0, panelOpen = false;
  function frame(t) {
    // drift gently when the mouse is idle (desktop only)
    let gx = tx, gy = ty;
    if (reduced || lite) { gx = gy = 0; }
    else if (t - lastMove > 4000) { gx = Math.sin(t * .00025) * .35; gy = Math.cos(t * .0002) * .2; }
    // while a sign's panel is open the garden keeps animating, but the camera holds still
    // where it was; when the panel closes it eases on from that same spot
    if (!panelOpen) { cx += (gx - cx) * .045; cy += (gy - cy) * .045; }

    if (portrait) {
      if (dragId === null && Math.abs(panVel) > .05) { panTarget = Math.min(panMax, Math.max(0, panTarget + panVel)); panVel *= .92; }
      panX += (panTarget - panX) * .25;
      if (panMax) panFrac = (panX + innerWidth / 2) / (panMax + innerWidth);
      sceneStage.style.transform = `translate3d(${(-panX).toFixed(1)}px,0,0)`;
    }
    if (reduced) { requestAnimationFrame(frame); return; }
    {
      if (!lite) {
        // parallax: move whole layers with CSS (GPU), only when they actually moved
        for (const L of layers) {
          const x = -cx * RANGE_X * L.d * unit, y = -cy * RANGE_Y * L.d * unit;
          if (Math.abs(x - L.x) > .05 || Math.abs(y - L.y) > .05) { L.x = x; L.y = y; L.g.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`; }
        }
      }
      // fireflies: 30 fps on phones is plenty
      if (!lite || t - lastMote > 33) { lastMote = t; drawMotes(t, cx * 22, cy * 13); }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- sign panels ---------- */
  const wrap = document.getElementById('panel-wrap');
  const sections = [...wrap.querySelectorAll('section[data-panel]')];
  const panelEl = wrap.querySelector('.panel');

  /* ---------- portfolio gallery ---------- */
  const IMG = n => `portfolio/${n}.webp`, THUMB = n => `portfolio/${n}-thumb.webp`;
  const gallery = document.getElementById('gallery');
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const home = document.getElementById('portfolio-home'), seriesView = document.getElementById('series-view');
  SERIES.forEach((sr, si) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'card series'; b.dataset.cat = sr.cats; b.id = 'card-' + sr.id;
    b.innerHTML = `<div class="thumb"><img src="${IMG(sr.cover)}" alt="${esc(sr.title)}" loading="lazy" decoding="async"${sr.coverPos ? ` style="object-position:${sr.coverPos}"` : ''}>` +
      `<span class="ribbon">${esc(sr.ribbon || 'Sustained investigation')}</span><span class="count">${sr.steps.length} images</span></div>` +
      `<div class="meta"><strong>${esc(sr.title)}</strong><span>${esc(sr.course)}${sr.year ? ' · ' + sr.year : ''} — ${sr.subtitle ? esc(sr.subtitle) : `“${esc(sr.inquiry.split('?')[0])}?”`}</span></div>`;
    b.addEventListener('click', () => openSeries(si));
    gallery.appendChild(b);
  });
  WORKS.forEach((w, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'card'; b.dataset.cat = w.cat;
    b.innerHTML = `<div class="thumb"><img src="${THUMB(w.images[0])}" alt="${esc(w.title)}" loading="lazy" decoding="async">` +
      (w.images.length > 1 ? `<span class="count">${w.images.length} photos</span>` : '') +
      `</div><div class="meta"><strong>${esc(w.title)}</strong><span>${esc(w.kind)}${w.year ? ' · ' + w.year : ''}</span></div>`;
    b.addEventListener('click', () => openViewer(workItems(w), 0));
    gallery.appendChild(b);
  });
  document.getElementById('portfolio-quote').textContent = '“' + QUOTE + '”';
  const stBox = document.getElementById('cat-statement'), stBody = document.getElementById('cat-statement-body'), stMore = document.getElementById('cat-statement-more');
  function showStatement(cat) {
    const paras = STATEMENTS[cat];
    stBox.hidden = !paras;
    if (!paras) return;
    stBody.innerHTML = paras.map(t => `<p>${esc(t)}</p>`).join('') +
      (LINKS[cat] ? `<p class="st-links">${LINKS[cat].map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} &#8599;</a>`).join('')}</p>` : '');
    stBox.classList.add('collapsed'); stMore.hidden = paras.length < 2; stMore.textContent = 'Read more';
  }
  stMore.addEventListener('click', () => {
    const c = stBox.classList.toggle('collapsed'); stMore.textContent = c ? 'Read more' : 'Show less';
  });
  document.querySelectorAll('#filters button').forEach(f => f.addEventListener('click', () => showStatement(f.dataset.cat)));
  document.querySelectorAll('#filters button').forEach(f => f.addEventListener('click', () => {
    document.querySelectorAll('#filters button').forEach(x => x.setAttribute('aria-pressed', x === f));
    gallery.querySelectorAll('.card').forEach(c => { c.hidden = f.dataset.cat !== 'all' && !c.dataset.cat.split(' ').includes(f.dataset.cat); });
  }));

  /* ---------- artwork viewer ---------- */
  const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
  const lbPrev = document.getElementById('lb-prev'), lbNext = document.getElementById('lb-next');
  let items = [], idx = 0, lbFocus = null;
  const field = (label, v) => v ? `<b>${label}:</b> ${esc(v)}` : '';
  function workItems(w) {
    return w.images.map((im, k) => ({
      src: IMG(im), title: w.title,
      meta: [w.kind, w.year, w.size].filter(Boolean).join(' · ') + (w.materials ? ' — ' + w.materials : ''),
      cap: w.captions ? w.captions[k] : '',
      desc: [w.desc ? esc(w.desc) : '', field('Process', w.process),
             w.links ? w.links.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join(' · ') : '']
             .filter(Boolean).join('<br>'),
    }));
  }
  function seriesItems(sr) {
    return sr.steps.map((st, k) => ({
      src: IMG(st.img), title: `${sr.title} — Image ${k + 1}`,
      meta: [st.piece, st.size].filter(Boolean).join(' · ') + (st.materials ? (st.piece || st.size ? ' — ' : '') + st.materials : ''),
      cap: sr.noStage ? [st.type, st.mine ? 'My design' : ''].filter(Boolean).join(' · ') : (st.final ? 'Finished piece' : 'Process / study'),
      desc: [st.note ? esc(st.note) : '', st.idea ? esc(st.idea) : '', field('Process', st.process)].filter(Boolean).join('<br>'),
    }));
  }
  function showImage() {
    const it = items[idx], n = items.length;
    lbImg.src = it.src; lbImg.alt = it.title + (it.cap ? ' — ' + it.cap : '');
    document.getElementById('lb-title').textContent = it.title;
    document.getElementById('lb-meta').textContent = it.meta;
    document.getElementById('lb-cap').textContent = (it.cap || '') + (n > 1 ? `  (${idx + 1} / ${n})` : '');
    document.getElementById('lb-desc').innerHTML = it.desc || '';
    lbPrev.hidden = lbNext.hidden = n < 2;
    if (n > 1) { const pre = new Image(); pre.src = items[(idx + 1) % n].src; }
  }
  function openViewer(list, j) { lbFocus = document.activeElement; items = list; idx = j; showImage(); lb.classList.add('open'); document.getElementById('lb-close').focus(); }
  function closeLightbox() { lb.classList.remove('open'); lbFocus && lbFocus.focus && lbFocus.focus(); }
  function step(d) { const n = items.length; if (n < 2) return; idx = (idx + d + n) % n; showImage(); }

  /* ---------- sustained investigation page ---------- */
  let openSeriesId = null;
  function openSeries(si) {
    const sr = SERIES[si]; openSeriesId = sr.id;
    const list = seriesItems(sr);
    seriesView.innerHTML = `
      <button type="button" class="back" id="series-back">&larr; Back to all work</button>
      <p class="eyebrow">${[sr.course, sr.year, sr.ribbon || 'Sustained investigation'].filter(Boolean).map(esc).join(' · ')}</p>
      <h3 class="series-title">${esc(sr.title)}</h3>
      ${(() => {
        const boxes = sr.boxes || [['Guiding inquiry', sr.inquiry, true], ['About the inquiry', sr.intro], ['How it developed through practice, experimentation & revision', sr.development, false, true]];
        const top = boxes.filter(b => !b[3]), wide = boxes.filter(b => b[3]);
        return `<div class="statements">${top.map(([h, t, big]) => `<div class="statement${big ? ' inquiry' : ''}"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`).join('')}</div>` +
          wide.map(([h, t]) => `<div class="statement" style="margin-bottom:1.1rem"><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`).join('');
      })()}
      ${sr.links ? `<p class="series-links">${sr.links.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)} &#8599;</a>`).join('')}</p>` : ''}
      ${sr.layout === 'gallery' ? (() => {
        const order = [], byG = {};
        sr.steps.forEach((st, k) => { const g = (sr.groups && sr.groups[st.type]) || st.type || 'Work';
          if (!byG[g]) { byG[g] = []; order.push(g); } byG[g].push([st, k]); });
        return `<nav class="group-nav">${order.map((g, i) => `<button type="button" data-g="${i}">${esc(g)} <span>${byG[g].length}</span></button>`).join('')}</nav>` +
          order.map((g, i) => `<section class="type-group" id="grp-${sr.id}-${i}"><h4>${esc(g)}</h4><div class="type-gallery">${byG[g].map(([st, k]) => `
            <button type="button" class="tile${st.wide ? ' wide' : ''}${st.full ? ' full' : ''}" data-k="${k}" aria-label="View ${esc(st.piece || 'image')} larger">
              <span class="tile-img"><img src="${st.full ? IMG(st.img) : THUMB(st.img)}" alt="${esc(st.piece || sr.title)}" loading="lazy" decoding="async"></span>
              <span class="tile-meta"><strong>${esc(st.piece || '')}</strong>${st.mine ? '<em>My design</em>' : ''}</span>
              ${st.note ? `<span class="tile-note">${esc(st.note)}</span>` : ''}
            </button>`).join('')}</div></section>`).join('');
      })() : `
      <p class="strip-label">${esc(sr.stripLabel || 'The full progression')} · ${sr.steps.length} images</p>
      <div class="strip">${sr.steps.map((st, k) =>
        `<button type="button" class="${st.final ? 'final' : ''}" data-k="${k}" aria-label="Go to image ${k + 1}"><img src="${THUMB(st.img)}" alt="" loading="lazy"><span>${k + 1}</span></button>`).join('')}</div>
      <ol class="steps">${sr.steps.map((st, k) => `
        <li class="step${st.final ? ' final' : ''}" id="step-${sr.id}-${k}">
          <button type="button" class="step-img" data-k="${k}" aria-label="View image ${k + 1} larger">
            <img src="${IMG(st.img)}" alt="${esc(sr.title)}, image ${k + 1}" loading="lazy" decoding="async"></button>
          <div>
            <div class="step-head"><span class="step-n">Image ${k + 1}</span>
              ${st.piece ? `<span class="tag">${esc(st.piece)}</span>` : ''}
              ${sr.noStage ? (st.mine ? '<span class="tag final">My design</span>' : '') : `<span class="tag${st.final ? ' final' : ''}">${st.final ? 'Finished piece' : 'Process / study'}</span>`}</div>
            <dl>
              ${st.type ? `<div><dt>Type</dt><dd>${esc(st.type)}</dd></div>` : ''}
              ${st.note ? `<div><dt>About</dt><dd>${esc(st.note)}</dd></div>` : ''}
              ${st.idea ? `<div><dt>Idea</dt><dd>${esc(st.idea)}</dd></div>` : ''}
              ${st.size ? `<div><dt>Size</dt><dd>${esc(st.size)}</dd></div>` : ''}
              ${st.materials ? `<div><dt>Materials</dt><dd>${esc(st.materials)}</dd></div>` : ''}
              ${st.process ? `<div><dt>Process</dt><dd>${esc(st.process)}</dd></div>` : ''}
              ${st.refs ? `<div><dt>References</dt><dd class="refs">${esc(st.refs)}</dd></div>` : ''}
            </dl>
          </div>
        </li>`).join('')}
      </ol>`}
      <button type="button" class="back" style="margin-top:1.4rem" id="series-back-2">&larr; Back to all work</button>`;
    seriesView.querySelectorAll('.step-img, .tile').forEach(b => b.addEventListener('click', () => openViewer(list, +b.dataset.k)));
    seriesView.querySelectorAll('.group-nav button').forEach(b => b.addEventListener('click', () =>
      document.getElementById(`grp-${sr.id}-${b.dataset.g}`).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })));
    seriesView.querySelectorAll('.strip button').forEach(b => b.addEventListener('click', () =>
      document.getElementById(`step-${sr.id}-${b.dataset.k}`).scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })));
    seriesView.querySelectorAll('#series-back, #series-back-2').forEach(b => b.addEventListener('click', closeSeries));
    home.hidden = true; seriesView.hidden = false; panelEl.scrollTop = 0;
    document.getElementById('series-back').focus({ preventScroll: true });
  }
  function closeSeries() {
    if (seriesView.hidden) return;
    seriesView.hidden = true; seriesView.innerHTML = ''; home.hidden = false; panelEl.scrollTop = 0;
    const c = document.getElementById('card-' + openSeriesId); c && c.focus({ preventScroll: false });
  }
  lbPrev.addEventListener('click', () => step(-1));
  lbNext.addEventListener('click', () => step(1));
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  let sx = null;
  const fig = document.getElementById('lb-figure');
  fig.addEventListener('pointerdown', e => { sx = e.clientX; });
  fig.addEventListener('pointerup', e => { if (sx !== null && Math.abs(e.clientX - sx) > 50) step(e.clientX < sx ? 1 : -1); sx = null; });
  let lastFocus = null;
  function openPanel(id) {
    lastFocus = document.activeElement;
    sections.forEach(s => { s.hidden = s.dataset.panel !== id; if (!s.hidden) s.querySelector('h2').id = 'panel-title'; else s.querySelector('h2').removeAttribute('id'); });
    wrap.classList.add('open');
    panelEl.classList.toggle('wide', id === 'portfolio');
    panelEl.classList.toggle('medium', id === 'about');
    if (id === 'portfolio') { seriesView.hidden = true; seriesView.innerHTML = ''; home.hidden = false; panelEl.scrollTop = 0; }
    document.body.classList.add('paused'); panelOpen = true;
    document.getElementById('panel-close').focus();
  }
  function closePanel() { wrap.classList.remove('open'); document.body.classList.remove('paused'); panelOpen = false; lastFocus && lastFocus.focus && lastFocus.focus(); }
  document.querySelectorAll('.mnav [data-panel]').forEach(b => b.addEventListener('click', () => openPanel(b.dataset.panel)));
  document.querySelectorAll('.sign').forEach(s => {
    s.addEventListener('click', () => openPanel(s.dataset.panel));
    s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPanel(s.dataset.panel); } });
  });
  document.getElementById('panel-close').addEventListener('click', closePanel);
  wrap.addEventListener('click', e => { if (e.target === wrap) closePanel(); });
  addEventListener('keydown', e => {
    if (lb.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      return;
    }
    if (e.key === 'Escape' && wrap.classList.contains('open')) closePanel();
  });
})();
