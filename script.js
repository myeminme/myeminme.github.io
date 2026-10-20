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
  let prefs = {}; try { prefs = JSON.parse(localStorage.getItem('garden-prefs') || '{}'); } catch (e) {}
  prefs = Object.assign({ lighter: 'auto', follow: true, still: false }, prefs);
  const savePrefs = () => { try { localStorage.setItem('garden-prefs', JSON.stringify(prefs)); } catch (e) {} };
  const root = document.documentElement;
  let lite = root.classList.contains('lite');
  const light = document.getElementById('cursor-light');
  const hint = document.getElementById('hint');
  const sceneStage = document.getElementById('scene-stage');
  const coarse = matchMedia('(pointer: coarse)').matches;
  let inGarden = false;

  /* ---------- layout: wide screens see everything, tall screens pan ---------- */
  let portrait = false, panX = 0, panTarget = 0, panMin = 0, panMax = 0, panVel = 0, panFrac = 0.79;
  function layout() {
    const was = portrait;
    portrait = innerWidth / innerHeight < 1.25;
    document.documentElement.classList.toggle('portrait', portrait);
    if (portrait) {
      const h = innerHeight * 1.06, w = h * 16 / 9;
      Object.assign(sceneStage.style, { width: w + 'px', height: h + 'px', left: '0px', top: (-innerHeight * .03) + 'px' });
      // keep the view clear of the scene's edges by the most the parallax can shift a layer,
      // so moving the mouse on a narrow window never uncovers the empty background
      const pad = Math.ceil(46 * .95 * w / 1920) + 2;
      panMin = Math.min(pad, Math.max(0, (w - innerWidth) / 2));
      panMax = Math.max(panMin, w - innerWidth - panMin);
      // start centred on the person writing (≈79% across the scene)
      panTarget = panX = Math.min(panMax, Math.max(panMin, w * panFrac - innerWidth / 2));
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
    panTarget = Math.min(panMax, Math.max(panMin, pan0 - dx));
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

  /* ---------- sign hover: light up the sign-shaped highlight ---------- */
  document.querySelectorAll('.sign').forEach(sg => {
    const on = () => { garden.dataset.hl = sg.dataset.panel; }, off = () => { if (garden.dataset.hl === sg.dataset.panel) delete garden.dataset.hl; };
    sg.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') on(); });
    sg.addEventListener('pointerleave', off);
    sg.addEventListener('focus', on); sg.addEventListener('blur', off);
  });

  /* ---------- the girl looks up when you hover her (tap her on phones) ---------- */
  const personHit = document.querySelector('.person-hit');
  let surpriseTimer = 0;
  const surprise = on => { clearTimeout(surpriseTimer); garden.classList.toggle('surprised', on); };
  if (personHit) {
    personHit.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') surprise(true); });
    personHit.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') surprise(false); });
    personHit.addEventListener('click', () => { surprise(false); openVN(); });
    personHit.setAttribute('role', 'button'); personHit.setAttribute('tabindex', '0'); personHit.removeAttribute('aria-hidden');
    personHit.setAttribute('aria-label', 'Talk to Mykha');
    personHit.addEventListener('focus', () => { if (personHit.matches(':focus-visible')) surprise(true); });
    personHit.addEventListener('blur', () => surprise(false));
    personHit.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openVN(); } });
  }

  /* ---------- flower cursor: next colour on every click ---------- */
  // native cursors can't animate, so a stand-in does the spin at the pointer
  let fx = null, fxTimer = 0;
  const moveFx = e => { if (fx) fx.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`; };
  function swapCursor(from, to, x, y) {
    clearTimeout(fxTimer);
    if (fx) fx.remove();
    fx = document.createElement('div');
    fx.className = 'cursor-fx';
    fx.innerHTML = `<img class="out" src="cursors/flower-${from}@2x.png" alt=""><img class="in" src="cursors/flower-${to}@2x.png" alt="">`;
    fx.style.transform = `translate3d(${x}px,${y}px,0)`;
    document.body.appendChild(fx);
    document.documentElement.classList.add('cursor-swap');
    addEventListener('pointermove', moveFx);
    fxTimer = setTimeout(() => {
      document.documentElement.classList.remove('cursor-swap');
      removeEventListener('pointermove', moveFx);
      if (fx) { fx.remove(); fx = null; }
    }, 440);
  }
  const FLOWERS = ['pink', 'green', 'orange'];
  let flower = 0;
  document.documentElement.dataset.cursor = FLOWERS[flower];
  FLOWERS.forEach(f => { const i = new Image(); i.src = `cursors/flower-${f}@2x.png`; });   // preload so the swap is instant
  addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    const prev = FLOWERS[flower];
    flower = (flower + 1) % FLOWERS.length;
    document.documentElement.dataset.cursor = FLOWERS[flower];
    if (!reduced) swapCursor(prev, FLOWERS[flower], e.clientX, e.clientY);
  });

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
    dpr = 1;   // fireflies are soft blurs: 1x is plenty (4x fewer pixels to upload on retina screens)
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
    if (reduced || !prefs.follow || prefs.still || coarse) { gx = gy = 0; }
    else if (t - lastMove > 4000) { gx = Math.sin(t * .00025) * .35; gy = Math.cos(t * .0002) * .2; }
    // while a sign's panel is open the garden keeps animating, but the camera holds still
    // where it was; when the panel closes it eases on from that same spot
    if (!panelOpen) { cx += (gx - cx) * .045; cy += (gy - cy) * .045; }

    if (portrait) {
      if (dragId === null && Math.abs(panVel) > .05) { panTarget = Math.min(panMax, Math.max(panMin, panTarget + panVel)); panVel *= .92; }
      panX += (panTarget - panX) * .25;
      if (panMax) panFrac = (panX + innerWidth / 2) / (panMax + innerWidth);
      sceneStage.style.transform = `translate3d(${(-panX).toFixed(1)}px,0,0)`;
    }
    if (reduced) { requestAnimationFrame(frame); return; }
    {
      {
        // parallax (eases back to centre when 'follow my mouse' is off): move whole layers with CSS (GPU), only when they actually moved
        for (const L of layers) {
          const x = -cx * RANGE_X * L.d * unit, y = -cy * RANGE_Y * L.d * unit;
          if (Math.abs(x - L.x) > .05 || Math.abs(y - L.y) > .05) { L.x = x; L.y = y; L.g.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`; }
        }
      }
      // fireflies: 30 fps on phones is plenty
      if (t - lastMote > 33 && !prefs.still) { lastMote = t; drawMotes(t, cx * 22, cy * 13); }   // 30 fps is plenty for slow fireflies
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- safety net (Lighter animations: Auto): if this computer can't keep up, go lighter ---------- */
  let autoLite = false;
  function setLite(on) { lite = on; root.classList.toggle('lite', on); resize(); }
  function probeSpeed() {
    let n = 0, t0 = 0, slow = 0;
    const probe = t => {
      if (prefs.lighter !== 'auto' || lite) return;
      if (!t0) t0 = t;
      n++;
      if (t - t0 >= 2000) {                          // ~2 s sample
        const fps = n * 1000 / (t - t0);
        if (fps < 40 && !document.hidden && !prefs.still) slow++; else slow = 0;
        if (slow >= 2) { autoLite = true; setLite(true); syncSettings(); return; }   // two slow samples in a row
        n = 0; t0 = t;
        if (performance.now() > 20000) return;       // only checks during the first ~20 s
      }
      requestAnimationFrame(probe);
    };
    setTimeout(() => requestAnimationFrame(probe), 1500);
  }
  if (!lite && prefs.lighter === 'auto') probeSpeed();

  /* ---------- settings (top left) ---------- */
  const setBtn = document.getElementById('settings-btn'), setPop = document.getElementById('settings-pop');
  const setFollow = document.getElementById('set-follow'), setStill = document.getElementById('set-still');
  function syncSettings() {
    document.querySelectorAll('[data-lighter]').forEach(b => b.setAttribute('aria-checked', b.dataset.lighter === prefs.lighter));
    document.getElementById('set-lighter-note').textContent = prefs.lighter === 'auto' ? (lite ? ' \u00B7 on for this device' : ' \u00B7 off for this device') : '';
    setFollow.checked = prefs.follow; setStill.checked = prefs.still;
    setFollow.disabled = coarse;
  }
  syncSettings();
  setBtn.addEventListener('click', e => { e.stopPropagation(); const open = setPop.hidden; setPop.hidden = !open; setBtn.setAttribute('aria-expanded', open); });
  document.addEventListener('click', e => { if (!setPop.hidden && !e.target.closest('#settings')) { setPop.hidden = true; setBtn.setAttribute('aria-expanded', 'false'); } });
  document.getElementById('settings').addEventListener('pointerdown', e => e.stopPropagation());
  document.querySelectorAll('[data-lighter]').forEach(b => b.addEventListener('click', () => {
    prefs.lighter = b.dataset.lighter; savePrefs();
    if (prefs.lighter === 'on') setLite(true);
    else if (prefs.lighter === 'off') setLite(false);
    else { const dev = coarse || Math.min(screen.width, screen.height) < 500 || (navigator.hardwareConcurrency || 8) <= 2; setLite(dev || autoLite); if (!lite) probeSpeed(); }
    syncSettings();
  }));
  setFollow.addEventListener('change', () => { prefs.follow = setFollow.checked; savePrefs(); });
  setStill.addEventListener('change', () => { prefs.still = setStill.checked; root.classList.toggle('still', prefs.still); savePrefs(); });

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
    b.innerHTML = `<div class="thumb${w.book ? ' book-thumb' : ''}"><img src="${THUMB(w.book ? 'catalog-p01' : w.images[0])}" alt="${esc(w.title)}" loading="lazy" decoding="async">` +
      (w.book ? `<span class="ribbon">Flip through it</span><span class="count">${w.book.pages} pages</span>` : w.images.length > 1 ? `<span class="count">${w.images.length} photos</span>` : '') +
      `</div><div class="meta"><strong>${esc(w.title)}</strong><span>${esc(w.kind)}${w.year ? ' · ' + w.year : ''}</span></div>`;
    b.addEventListener('click', () => w.book ? openBook(w) : openViewer(workItems(w), 0));
    gallery.appendChild(b);
  });
  /* ---------- featured work: big cards that rise in and tilt toward the cursor ---------- */
  const featGrid = document.getElementById('featured-grid');
  (typeof FEATURED !== 'undefined' ? FEATURED : []).forEach((title, n) => {
    const si = SERIES.findIndex(x => x.id === title), sr = SERIES[si];
    const w = sr ? null : WORKS.find(x => x.title === title); if (!sr && !w) return;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'feat'; b.style.setProperty('--i', n);
    if (sr) {   // a whole project page
      const about = (sr.boxes ? (sr.boxes.find(x => x[0] === 'About' || x[0] === 'What it is') || [])[1] : sr.inquiry) || '';
      b.innerHTML = `<span class="feat-img"><img src="${IMG(sr.cover)}" alt="${esc(sr.title)}" loading="lazy" decoding="async" style="${sr.coverPos ? `object-position:${sr.coverPos};` : ''}${sr.featFit ? `object-fit:${sr.featFit};object-position:50% 50%;` : ''}${sr.featBg ? `background:${sr.featBg};` : ''}">` +
        `<span class="ribbon">${esc(sr.ribbon || 'Sustained investigation')}</span></span>` +
        `<span class="feat-meta"><strong>${esc(sr.title)}</strong><em>${esc([sr.course, sr.year].filter(Boolean).join(' · '))}${sr.subtitle ? ' — ' + esc(sr.subtitle) : ''}</em>` +
        (about ? `<span class="feat-desc">${esc(about)}</span>` : '') + `<span class="feat-more">View project (${sr.steps.length} images) &rarr;</span></span>`;
      b.addEventListener('click', () => openSeries(si));
    } else {
      b.innerHTML = `<span class="feat-img${w.book ? ' book-thumb' : ''}"><img src="${IMG(w.book ? 'catalog-p01' : w.images[0])}" alt="${esc(w.title)}" loading="lazy" decoding="async">${w.book ? '<span class="ribbon">Flip through it</span>' : ''}</span>` +
        `<span class="feat-meta"><strong>${esc(w.title)}</strong><em>${esc([w.kind, w.year].filter(Boolean).join(' · '))}${w.materials && w.materials !== w.kind ? ' — ' + esc(w.materials) : ''}</em>` +
        (w.desc ? `<span class="feat-desc">${esc(w.desc)}</span>` : '') + `<span class="feat-more">${w.book ? 'Open the book' : 'View piece'} &rarr;</span></span>`;
      b.addEventListener('click', () => w.book ? openBook(w) : openViewer(workItems(w), 0));
    }
    if (!coarse && !reduced) {
      b.addEventListener('pointermove', e => {
        const r = b.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        b.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`); b.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`);
        b.style.setProperty('--gx', `${((x + .5) * 100).toFixed(1)}%`); b.style.setProperty('--gy', `${((y + .5) * 100).toFixed(1)}%`);
      });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--rx', '0deg'); b.style.setProperty('--ry', '0deg'); });
    }
    featGrid.appendChild(b);
  });
  // cards rise in as they scroll into view
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
    featGrid.querySelectorAll('.feat').forEach(f => io.observe(f));
  } else featGrid.querySelectorAll('.feat').forEach(f => f.classList.add('in'));
  const seeAll = document.getElementById('see-all'), allWork = document.getElementById('all-work');
  seeAll.textContent = `See all work (${SERIES.length + WORKS.length})`;
  seeAll.addEventListener('click', () => {
    const open = allWork.hidden; allWork.hidden = !open;
    seeAll.setAttribute('aria-expanded', open);
    seeAll.textContent = open ? 'Show less' : `See all work (${SERIES.length + WORKS.length})`;
    if (open) allWork.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
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
  // the filters sit at the top of the panel: picking one opens the full gallery and jumps to it
  document.querySelectorAll('#filters button').forEach(f => f.addEventListener('click', () => {
    const aw = document.getElementById('all-work'), sa = document.getElementById('see-all');
    if (aw.hidden) { aw.hidden = false; sa.setAttribute('aria-expanded', 'true'); sa.textContent = 'Show less'; }
    requestAnimationFrame(() => aw.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }));
  }));
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

  /* ---------- book viewer: the Artist Catalog reads like a real book ---------- */
  const bkView = document.getElementById('book-view'), bkBook = document.getElementById('bk-book');
  const bkCount = document.getElementById('bk-count'), bkPrev = document.getElementById('bk-prev'), bkNext = document.getElementById('bk-next');
  let bkLeaves = [], bkAt = 0, bkWork = null, bkFocus = null, bkGardenWas = false;
  function openBook(w) {
    bkWork = w; bkFocus = document.activeElement;
    const pg = n => { const id = `catalog-p${String(n).padStart(2, '0')}`; return w.images.includes(id) ? id : null; };
    // the files are the printed book in order: p01 front cover, p02 inside cover, ..., last = back cover.
    // leaf k: front = right-hand page, back = the left-hand page you see once it's turned
    const faces = [];
    for (let n = 1; n <= w.book.pages; n++) faces.push(pg(n) ? { img: pg(n), n } : { blank: true, n });
    faces[0].cover = 'front'; faces[faces.length - 1].cover = 'back';
    if (faces.length % 2) faces.splice(faces.length - 1, 0, { blank: true });
    bkLeaves = [];
    bkBook.innerHTML = '';
    for (let k = 0; k < faces.length / 2; k++) {
      const leaf = document.createElement('div'); leaf.className = 'bk-leaf';
      leaf.innerHTML = [faces[2 * k], faces[2 * k + 1]].map((f, side) =>
        `<div class="face ${side ? 'bk-back' : 'bk-front'}${f.cover ? ' cover cover-' + f.cover : ''}${f.blank ? ' blank' : ''}"` +
        (f.img ? ` data-img="${f.img}"` : '') + '></div>').join('');
      leaf.addEventListener('click', () => turn(leaf.classList.contains('flipped') ? -1 : 1));
      bkBook.appendChild(leaf); bkLeaves.push(leaf);
    }
    bkAt = 0; bkShow(true);
    bkGardenWas = document.documentElement.classList.contains('in-garden');
    document.documentElement.classList.remove('in-garden');   // pause the garden behind the book so page turns stay smooth
    document.documentElement.classList.add('book-open');      // and stop drawing it (and the panel) while the book covers them
    bkView.classList.add('open'); document.getElementById('bk-close').focus();
  }
  function bkShow(instant) {
    const L = bkLeaves.length, now = performance.now();
    bkLeaves.forEach((leaf, k) => {
      const flipped = k < bkAt;
      if (instant) leaf.style.transition = 'none';
      leaf.classList.toggle('flipped', flipped);
      // settled pages stack like a real book; a page still turning stays on top until it lands
      leaf.style.zIndex = leaf._turnUntil > now ? L + 2 + Math.round(leaf._turnUntil / 10) % 1000 : (flipped ? k + 1 : L - k);
      if (instant) { leaf.offsetWidth; leaf.style.transition = ''; }
      // load (and decode) the pages a few turns ahead so a turn never waits on an image
      if (Math.abs(k - bkAt) <= 3) leaf.querySelectorAll('[data-img]').forEach(f => {
        const src = IMG(f.dataset.img), im = new Image(); im.src = src;
        (im.decode ? im.decode() : Promise.resolve()).catch(() => {}).then(() => { f.style.backgroundImage = `url('${src}')`; });
        f.removeAttribute('data-img');
      });
    });
    bkBook.classList.toggle('closed-front', bkAt === 0);
    bkBook.classList.toggle('closed-back', bkAt === L);
    bkPrev.disabled = bkAt === 0; bkNext.disabled = bkAt === L;
    // printed page numbers start after the cover and inside cover (file 3 = page 1)
    const left = 2 * bkAt - 2, right = 2 * bkAt - 1, last = bkWork.book.pages - 3;
    bkCount.textContent = bkAt === 0 ? 'Front cover' : bkAt === L ? 'Back cover'
      : left < 1 ? `Page ${right}` : right > last ? `Page ${left}` : `Pages ${left}\u2013${right}`;
  }
  function turn(d) {
    const to = Math.max(0, Math.min(bkLeaves.length, bkAt + d)); if (to === bkAt) return;
    const moving = bkLeaves[d > 0 ? bkAt : to];
    moving._turnUntil = performance.now() + 950;
    bkAt = to; bkShow(false);
    clearTimeout(moving._z); moving._z = setTimeout(() => bkShow(false), 980);
  }
  function closeBook() { bkView.classList.remove('open'); document.documentElement.classList.remove('book-open'); if (bkGardenWas) document.documentElement.classList.add('in-garden'); bkFocus && bkFocus.focus && bkFocus.focus(); }
  bkPrev.addEventListener('click', () => turn(-1)); bkNext.addEventListener('click', () => turn(1));
  document.getElementById('bk-close').addEventListener('click', closeBook);
  document.getElementById('bk-images').addEventListener('click', () => { const w = bkWork; closeBook(); openViewer(workItems(w), 0); });
  bkView.addEventListener('click', e => { if (e.target === bkView || e.target.classList.contains('bk-stage')) closeBook(); });
  let bkSx = null;
  bkBook.addEventListener('pointerdown', e => { bkSx = e.clientX; });
  bkBook.addEventListener('pointerup', e => { if (bkSx !== null && Math.abs(e.clientX - bkSx) > 40) { turn(e.clientX < bkSx ? 1 : -1); bkBook._swiped = true; setTimeout(() => bkBook._swiped = false, 50); } bkSx = null; });
  bkBook.addEventListener('click', e => { if (bkBook._swiped) e.stopPropagation(); }, true);

  /* ---------- sustained investigation page ---------- */
  let openSeriesId = null;
  /* ---------- PNGtuber demo: talks on its own or to your voice, closes its eyes while you click ---------- */
  function startPngtuber(el) {
    if (!el) return;
    const wrap = el.parentElement, hint = wrap.querySelector('.ptb-hint'), micBtn = wrap.querySelector('.ptb-mic');
    const frames = {}; el.querySelectorAll('img').forEach(i => { frames[i.dataset.f] = i; });
    let eyes = 'star', mouth = 'smile', held = false, releaseAt = 0, mic = null;
    const show = () => {
      el.querySelectorAll('img.on').forEach(i => i.classList.remove('on'));
      frames[`${eyes}-${mouth}`].classList.add('on');
      el.classList.toggle('talking', mouth !== 'smile');
    };
    // with no mic: a loose "speech" rhythm, syllables then a pause
    const TALK = [['open', 150], ['grin', 120], ['open', 170], ['smile', 110], ['open', 140], ['grin', 160], ['smile', 1300],
                  ['open', 130], ['smile', 90], ['open', 180], ['grin', 140], ['open', 120], ['smile', 1700]];
    let k = 0;
    const tick = () => {
      if (!el.isConnected) return stopMic();
      if (mic) return;   // the voice is in charge
      const [m, ms] = TALK[k++ % TALK.length];
      mouth = reduced ? 'smile' : m; show();
      setTimeout(tick, ms);
    };

    // with the mic: loudness picks the mouth, and the avatar hops with your voice
    function stopMic() {
      if (!mic) return;
      mic.stream.getTracks().forEach(t => t.stop()); mic.ctx.close(); cancelAnimationFrame(mic.raf); mic = null;
      el.style.removeProperty('--hop'); el.classList.remove('mic');
    }
    async function startMic() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const an = ctx.createAnalyser(); an.fftSize = 1024; ctx.createMediaStreamSource(stream).connect(an);
        const buf = new Float32Array(an.fftSize);
        mic = { stream, ctx, raf: 0 }; el.classList.add('mic');
        let level = 0, lastLoud = 0;
        const listen = () => {
          if (!el.isConnected) return stopMic();
          if (!mic) return;
          an.getFloatTimeDomainData(buf);
          let sum = 0; for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
          const rms = Math.sqrt(sum / buf.length);
          level += (rms - level) * (rms > level ? .6 : .15);          // quick to rise, slower to fall
          const now = performance.now();
          if (level > .02) lastLoud = now;
          mouth = level > .09 ? 'grin' : level > .02 ? 'open' : (now - lastLoud < 120 ? mouth : 'smile');
          show();
          el.style.setProperty('--hop', `${-Math.min(14, level * 120)}px`);
          mic.raf = requestAnimationFrame(listen);
        };
        listen();
        micBtn.textContent = 'Stop listening'; micBtn.setAttribute('aria-pressed', 'true');
        hint.textContent = 'Talk and they talk with you. Click them to close their eyes';
      } catch (err) {
        hint.textContent = 'The mic was blocked, so they\u2019ll keep chatting on their own';
      }
    }
    if (micBtn) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) micBtn.hidden = true;
      micBtn.addEventListener('click', () => {
        if (mic) {
          stopMic(); micBtn.textContent = 'Talk to them \u{1F3A4}'; micBtn.setAttribute('aria-pressed', 'false');
          hint.textContent = 'Click them to close their eyes'; tick();
        } else startMic();
      });
    }

    const close = e => { if (e) e.preventDefault(); held = true; releaseAt = performance.now() + 260; eyes = 'closed'; show(); };
    const open = () => {
      if (!held) return; held = false;
      setTimeout(() => { if (!held) { eyes = 'star'; show(); } }, Math.max(0, releaseAt - performance.now()));
    };
    el.addEventListener('pointerdown', close);
    addEventListener('pointerup', open); addEventListener('pointercancel', open);
    el.addEventListener('keydown', e => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) close(e); });
    el.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'Enter') open(); });
    tick();
  }

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
      ${sr.demo === 'pngtuber' ? `<div class="ptb-wrap"><button type="button" class="ptb" aria-label="PNGtuber avatar. Click to make them close their eyes">
        ${['star', 'closed'].flatMap(e => ['smile', 'open', 'grin'].map(m =>
          `<img src="${IMG(`pngtuber-${e}-${m}`)}" data-f="${e}-${m}" alt="" decoding="async"${e === 'star' && m === 'smile' ? ' class="on"' : ''}>`)).join('')}
        </button><button type="button" class="ptb-mic" aria-pressed="false">Talk to them &#127908;</button><p class="ptb-hint">Click them to close their eyes</p></div>` : ''}
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
    if (sr.demo === 'pngtuber') startPngtuber(seriesView.querySelector('.ptb'));
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
  function closePanel() { const pm = seriesView.querySelector('.ptb-mic[aria-pressed="true"]'); if (pm) pm.click();   // closing the panel turns the mic off
  wrap.classList.remove('open'); document.body.classList.remove('paused'); panelOpen = false; lastFocus && lastFocus.focus && lastFocus.focus(); }
  const openSign = id => id === 'about' ? openVN() : openPanel(id);   // About Me is a conversation with her now
  document.querySelectorAll('.mnav [data-panel]').forEach(b => b.addEventListener('click', () => openSign(b.dataset.panel)));
  document.querySelectorAll('.sign').forEach(s => {
    s.addEventListener('click', () => openSign(s.dataset.panel));
    s.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSign(s.dataset.panel); } });
  });
  document.getElementById('panel-close').addEventListener('click', closePanel);
  wrap.addEventListener('click', e => { if (e.target === wrap) closePanel(); });

  /* =========================================================
     ABOUT ME: a visual-novel chat with her (lines live in CHAT / JOURNAL in portfolio-data.js)
     ========================================================= */
  const vn = document.getElementById('vn'), vnText = document.getElementById('vn-text'), vnBox = document.getElementById('vn-box');
  const vnMore = document.getElementById('vn-more'), vnChoices = document.getElementById('vn-choices');
  const vnJournal = document.getElementById('vn-journal'), vnPhoto = document.getElementById('vn-photo');
  let vnFocus = null, vnQueue = [], vnThen = null, vnTyping = 0, vnFull = '', vnGardenWas = false;
  // the garden zooms in on her (the original scene character is who you talk to); each chat scene
  // frames her in a different spot: right for the menu / photo, left while you ask questions
  const ZOOM = { menu: [.62, .42], photo: [.64, .42], ask: [.64, .42] };
  let zoomCam = false;
  function zoomTo(on, layout) {
    if (!on) { garden.style.transform = ''; garden.classList.remove('zoomed'); if (zoomCam) { panelOpen = false; zoomCam = false; } return; }
    if (!garden.classList.contains('zoomed')) {
      // measure her with the zoom off
      const r = (personHit || garden).getBoundingClientRect();
      zoomTo.p = [r.left + r.width / 2, r.top + r.height * .33];
    }
    const phone = innerWidth < 760, s = phone ? 1.6 : 1.75;
    const [fx, fy] = phone ? [.5, .32] : (ZOOM[layout] || ZOOM.menu);
    garden.style.transformOrigin = '0 0';
    // never pan past the edge of the drawing
    const clamp = (v, lo) => Math.min(0, Math.max(lo, v));
    const tx = clamp(innerWidth * fx - zoomTo.p[0] * s, innerWidth * (1 - s)), ty = clamp(innerHeight * fy - zoomTo.p[1] * s, innerHeight * (1 - s));
    garden.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
    garden.classList.add('zoomed');
    if (!panelOpen) { panelOpen = true; zoomCam = true; }   // hold the parallax camera still while zoomed
  }
  let vnOpening = false;
  function openVN() {
    if (vn.classList.contains('open') || vnOpening) return;
    vnFocus = document.activeElement;
    vnGardenWas = document.documentElement.classList.contains('in-garden');
    surprise(false);
    garden.dataset.mood = 'excited';   // she notices you as the camera moves in
    if (!reduced) { vnOpening = true; zoomTo(true, 'menu'); setTimeout(() => { vnOpening = false; showVN(); }, 520); }
    else { zoomTo(true, 'menu'); showVN(); }
  }
  function showVN() {
    vn.classList.add('open'); document.documentElement.classList.add('vn-open');
    vnJournal.hidden = vnPhoto.hidden = true;
    scene('menu'); say(CHAT.hello, () => { mood('calm'); menu(); }, 'excited');
    setTimeout(() => vnBox.focus({ preventScroll: true }), 60);
  }
  function closeVN() {
    clearInterval(vnTyping); vn.classList.remove('open', 'talking'); document.documentElement.classList.remove('vn-open');
    zoomTo(false);
    garden.classList.remove('surprised');
    vnFocus && vnFocus.focus && vnFocus.focus();
  }
  // show lines one at a time with a typewriter; click / Enter / Space to continue
  // her face: 'calm' or 'excited' (the two expression heads from Figma)
  const mood = m => { vn.dataset.mood = m; garden.dataset.mood = m; };
  // her mouth in the garden moves while the dialogue types
  new MutationObserver(() => garden.classList.toggle('talking', vn.classList.contains('talking'))).observe(vn, { attributes: true, attributeFilter: ['class'] });
  // where she stands: 'menu' (choices left, her on the right), 'ask' (her left, questions right), 'photo'
  const scene = l => { vn.dataset.layout = l; if (vn.classList.contains('open') || vnOpening) zoomTo(true, l); };
  function say(lines, then, m) { vnQueue = [...lines]; vnThen = then; if (m) mood(m); choices([]); nextLine(); }
  function nextLine() {
    if (vnTyping) { clearInterval(vnTyping); vnTyping = 0; vnText.textContent = vnFull; vn.classList.remove('talking'); vnMore.hidden = false; return; }
    if (!vnQueue.length) { vnMore.hidden = true; const t = vnThen; vnThen = null; t && t(); return; }
    vnFull = vnQueue.shift(); vnText.textContent = ''; vnMore.hidden = true;
    if (reduced) { vnText.textContent = vnFull; vnMore.hidden = false; return; }
    let i = 0; vn.classList.add('talking');
    vnTyping = setInterval(() => {
      vnText.textContent = vnFull.slice(0, ++i);
      if (i >= vnFull.length) { clearInterval(vnTyping); vnTyping = 0; vn.classList.remove('talking'); vnMore.hidden = false; }
    }, 24);
  }
  vnBox.addEventListener('click', () => { if (vnTyping || vnQueue.length || vnThen) nextLine(); });
  vnBox.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (vnTyping || vnQueue.length || vnThen) nextLine(); } });
  function choices(list) {
    vnChoices.innerHTML = '';
    list.forEach(([label, fn], k) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'vn-choice'; b.textContent = label;
      b.style.setProperty('--i', k); b.addEventListener('click', fn); vnChoices.appendChild(b);
    });
    vnChoices.classList.toggle('show', list.length > 0);
    if (list.length) setTimeout(() => { const f = vnChoices.querySelector('button'); f && f.focus({ preventScroll: true }); }, 30);
  }
  function menu() {
    scene('menu'); mood('calm'); actions([]);
    choices([
      ['\u{1F4D6}  Show me your journal', () => say(CHAT.journal, openJournal, 'calm')],
      ['\u{1F4F7}  Can I take a photo?', () => { scene('photo'); say(CHAT.photo, takePhoto, 'excited'); }],
      ['\u{1F4AC}  Can I ask you something?', () => { scene('ask'); say(CHAT.askIntro, askMenu, 'excited'); }],
      ['\u{1F44B}  Bye!', () => say(CHAT.bye, closeVN, 'excited')],
    ]);
  }
  function askMenu() {
    scene('ask'); mood('calm');
    const back = () => say(CHAT.again, menu, 'calm');
    choices([...CHAT.questions.map(({ q, a, link, open: url }) => [q, () => {
      if (url) open(url, '_blank', 'noopener');   // e.g. the resume PDF
      say(a, () => {
        if (link) choices([[link[0] + ' \u2197', () => open(link[1], '_blank', 'noopener')], ['Ask something else', askMenu], ['That\u2019s all, thanks!', back]]);
        else askMenu();
      }, 'calm');
    }]), ['That\u2019s all, thanks!', back]]);
  }
  // buttons that sit inside the dialogue box (e.g. "Back to talking")
  const vnActions = document.getElementById('vn-actions');
  function actions(list) {
    vnActions.innerHTML = '';
    list.forEach(([label, fn]) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'vn-btn'; b.textContent = label;
      b.addEventListener('click', e => { e.stopPropagation(); fn(); }); vnActions.appendChild(b); });
  }

  /* ---------- her journal: flips like the Artist Catalog ---------- */
  const jrBook = document.getElementById('jr-book'), jrCount = document.getElementById('jr-count');
  let jrLeaves = [], jrAt = 0, jrSingle = false;
  const jrPageHTML = (p, n) => `<article class="jr-page"><h4>${esc(p.title)}</h4>` +
    (p.pic ? `<figure class="jr-pic"><img src="${THUMB(p.pic[0])}" alt="${esc(p.pic[1])}" loading="lazy"><figcaption>${esc(p.pic[1])}</figcaption></figure>` : '') +
    p.lines.map(l => `<p>${esc(l)}</p>`).join('') + `<span class="jr-n">${n}</span></article>`;
  const jrCover = back => `<div class="jr-cover-art"><span>${back ? 'thanks for reading!' : 'Mykha’s<br>Journal'}</span></div>`;
  function jrBuild() {
    jrSingle = innerWidth < 760;
    // faces in reading order: front cover, pages..., back cover
    let faces = [{ cover: 'front' }, ...JOURNAL.map((p, i) => ({ html: jrPageHTML(p, i + 1) })), { cover: 'back' }];
    if (!jrSingle) { faces.splice(1, 0, { blank: true }); if (faces.length % 2) faces.splice(faces.length - 1, 0, { blank: true }); }
    // two-page book: each leaf = right page (front) + the left page on its back. Phones: one page per leaf.
    const per = jrSingle ? 1 : 2;
    jrBook.innerHTML = ''; jrLeaves = [];
    jrBook.classList.toggle('single', jrSingle);
    for (let k = 0; k < faces.length; k += per) {
      const leaf = document.createElement('div'); leaf.className = 'bk-leaf';
      leaf.innerHTML = faces.slice(k, k + per).map((f, side) =>
        `<div class="face ${side ? 'bk-back' : 'bk-front'}${f.cover ? ' jr-cover jr-cover-' + f.cover : ''}${f.blank ? ' blank' : ''}">` +
        (f.cover ? jrCover(f.cover === 'back') : f.html || '') + '</div>').join('');
      leaf.addEventListener('click', e => { if (e.target.closest('a')) return; jrTurn(leaf.classList.contains('flipped') ? -1 : 1); });
      jrBook.appendChild(leaf); jrLeaves.push(leaf);
    }
  }
  function jrShow(instant) {
    const L = jrLeaves.length, now = performance.now();
    const last = jrSingle ? L - 1 : L;   // a single-page journal stops on its back cover
    jrLeaves.forEach((leaf, k) => {
      const flipped = k < jrAt;
      if (instant) leaf.style.transition = 'none';
      leaf.classList.toggle('flipped', flipped);
      leaf.style.zIndex = leaf._turnUntil > now ? L + 2 : (flipped ? k + 1 : L - k);
      if (instant) { leaf.offsetWidth; leaf.style.transition = ''; }
    });
    jrBook.classList.toggle('closed-front', jrAt === 0 && !jrSingle);
    jrBook.classList.toggle('closed-back', jrAt === L && !jrSingle);
    document.getElementById('jr-prev').disabled = jrAt === 0;
    document.getElementById('jr-next').disabled = jrAt >= last;
    const n = JOURNAL.length;
    jrCount.textContent = jrAt === 0 ? 'Cover' : jrAt >= last ? 'The end'
      : jrSingle ? `Page ${jrAt} of ${n}` : (() => {   // spread k shows pages 2k-2 (left) and 2k-1 (right); the first spread's left side is the inside cover
          const l = 2 * jrAt - 2, r = 2 * jrAt - 1;
          return l < 1 ? `Page ${r} of ${n}` : r > n ? `Page ${l} of ${n}` : `Pages ${l}\u2013${r} of ${n}`; })();
  }
  function jrTurn(d) {
    const last = jrSingle ? jrLeaves.length - 1 : jrLeaves.length;
    const to = Math.max(0, Math.min(last, jrAt + d)); if (to === jrAt) return;
    const moving = jrLeaves[d > 0 ? jrAt : to];
    moving._turnUntil = performance.now() + 950;
    jrAt = to; jrShow(false);
    clearTimeout(moving._z); moving._z = setTimeout(() => jrShow(false), 980);
  }
  function openJournal() { choices([]); vnJournal.hidden = false; jrBuild(); jrAt = 0; jrShow(true); document.getElementById('jr-next').focus(); }
  function closeJournal() { vnJournal.hidden = true; say(CHAT.journalDone.concat(CHAT.again), menu); vnBox.focus({ preventScroll: true }); }
  document.getElementById('jr-prev').addEventListener('click', () => jrTurn(-1));
  document.getElementById('jr-next').addEventListener('click', () => jrTurn(1));
  document.getElementById('jr-done').addEventListener('click', closeJournal);
  let jrSx = null;
  jrBook.addEventListener('pointerdown', e => { jrSx = e.clientX; });
  jrBook.addEventListener('pointerup', e => { if (jrSx !== null && Math.abs(e.clientX - jrSx) > 40) { jrTurn(e.clientX < jrSx ? 1 : -1); jrBook._swiped = true; setTimeout(() => jrBook._swiped = false, 50); } jrSx = null; });
  jrBook.addEventListener('click', e => { if (jrBook._swiped) e.stopPropagation(); }, true);
  addEventListener('resize', () => { if (!vnJournal.hidden && (innerWidth < 760) !== jrSingle) { jrBuild(); jrAt = 0; jrShow(true); } });

  /* ---------- the photo: two polaroids (Figma layout); flipping slides them across each other ---------- */
  const vnCount = document.getElementById('vn-count'), vnFlash = document.getElementById('vn-flash');
  const polStack = document.getElementById('pol-stack'), pols = [...polStack.querySelectorAll('.polaroid')];
  const PHOTOS = ['photo-1', 'photo-2'];
  PHOTOS.forEach(n => { const i = new Image(); i.src = `portfolio/${n}.webp`; });
  const photoCap = () => `Mykha · ${new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`;
  function polFill() {
    const first = Math.floor(Math.random() * PHOTOS.length);
    pols.forEach((p, k) => {
      p.querySelector('.polaroid-pic').innerHTML = `<img src="portfolio/${PHOTOS[(first + k) % PHOTOS.length]}.webp" alt="Photo of Mykha" draggable="false">`;
      p.querySelector('figcaption').textContent = photoCap();
      p.classList.toggle('at-front', k === 0); p.classList.toggle('at-back', k === 1);
    });
  }
  function takePhoto() {
    choices([]); vnPhoto.hidden = false; scene('photo'); mood('excited');
    polStack.classList.remove('show', 'developed'); polFill();
    actions([['Back to talking', closePhoto]]);
    vn.classList.add('posing'); void polStack.offsetWidth; polStack.classList.add('show');
    const steps = reduced ? [] : ['3', '2', '1'];
    let k = 0;
    const tick = () => {
      if (k < steps.length) { vnCount.textContent = steps[k++]; vnCount.classList.remove('pop'); void vnCount.offsetWidth; vnCount.classList.add('pop'); setTimeout(tick, 650); return; }
      vnCount.textContent = ''; vnFlash.classList.remove('go'); void vnFlash.offsetWidth; vnFlash.classList.add('go');
      setTimeout(() => { polStack.classList.add('developed'); say(CHAT.photoDone, () => {}, 'excited'); }, 260);
    };
    tick();
  }
  document.getElementById('pol-flip').addEventListener('click', e => {
    e.stopPropagation();
    if (polStack.classList.contains('swapping')) return;
    polStack.classList.add('swapping');
    pols.forEach(p => { const f = p.classList.contains('at-front'); p.classList.toggle('at-front', !f); p.classList.toggle('at-back', f); });
    setTimeout(() => polStack.classList.remove('swapping'), 700);
  });
  function closePhoto() { vnPhoto.hidden = true; vn.classList.remove('posing'); actions([]); say(CHAT.again, menu, 'calm'); vnBox.focus({ preventScroll: true }); }

  document.getElementById('vn-close').addEventListener('click', closeVN);
  addEventListener('keydown', e => {
    if (vn.classList.contains('open')) {
      if (e.key === 'Escape') { if (!vnJournal.hidden) closeJournal(); else if (!vnPhoto.hidden) closePhoto(); else closeVN(); }
      else if (!vnJournal.hidden && e.key === 'ArrowRight') jrTurn(1);
      else if (!vnJournal.hidden && e.key === 'ArrowLeft') jrTurn(-1);
      return;
    }
    if (bkView.classList.contains('open')) {
      if (e.key === 'Escape') closeBook();
      else if (e.key === 'ArrowRight') turn(1);
      else if (e.key === 'ArrowLeft') turn(-1);
      return;
    }
    if (lb.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      return;
    }
    if (e.key === 'Escape' && wrap.classList.contains('open')) closePanel();
  });
})();
