/* Shared script for the career sites: draft mode, image viewer, contact form. */
(() => {
  if (/[?&]draft\b/.test(location.search)) document.documentElement.classList.add('draft');
  const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* image viewer */
  const lb = document.getElementById('lightbox'), img = document.getElementById('lb-img'), cap = document.getElementById('lb-cap');
  document.querySelectorAll('.shot').forEach(b => b.addEventListener('click', () => {
    img.src = b.dataset.full; img.alt = b.dataset.cap; cap.textContent = b.dataset.cap;
    if (lb.showModal) lb.showModal(); else window.open(b.dataset.full, '_blank');
  }));
  document.getElementById('lb-x').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });

  /* contact form -> email (FormSubmit) */
  const form = document.getElementById('inquiry'); if (!form) return;
  const ENDPOINT = 'https://formsubmit.co/ajax/mdf17@umd.edu';
  const status = document.getElementById('inq-status'), send = document.getElementById('inq-send');
  const say = (msg, cls) => { status.className = 'status' + (cls ? ' ' + cls : ''); status.innerHTML = msg; };
  form.addEventListener('input', e => e.target.classList.remove('bad'));
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const f = form.elements; let bad = null;
    for (const el of [f.name, f.email, f.message]) {
      const ok = el.value.trim() && (el.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
      el.classList.toggle('bad', !ok); if (!ok && !bad) bad = el;
    }
    if (bad) { say('Please fill in your name, a valid email, and a message.', 'err'); bad.focus(); return; }
    if (f._honey.value) { say('Thanks! Your message is on its way.', 'ok'); form.reset(); return; }
    send.disabled = true; say('Sending…');
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: f.name.value.trim(), email: f.email.value.trim(), topic: f.topic.value, site: form.dataset.site + ' site',
          message: f.message.value.trim(), _subject: `Portfolio inquiry (${form.dataset.site}): ${f.topic.value} from ${f.name.value.trim()}`,
          _replyto: f.email.value.trim(), _template: 'table', _captcha: 'false' }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || String(j.success) === 'false') throw new Error(j.message || r.status);
      form.reset(); say('Thanks! Your message is on its way. I’ll get back to you by email.', 'ok');
    } catch (err) {
      say('Sorry, that didn’t go through. You can email me directly at <a href="mailto:mdf17@umd.edu">mdf17@umd.edu</a>.', 'err');
    } finally { send.disabled = false; }
  });
})();
