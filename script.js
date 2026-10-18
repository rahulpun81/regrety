/* =====================================================================
   SCRIPT.JS — behaviour only. All words live in content.js.
   Nothing here sends data anywhere: no network calls, no storage.
   ===================================================================== */
(() => {
  'use strict';

  const S = window.SITE || {};
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => mqReduce.matches;
  const fmt = (t = '') => String(t).replace(/\{name\}/g, S.nickname || 'love');
  const shuffle = (a) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  /** tiny element builder */
  const h = (tag, props = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    kids.flat().forEach((c) => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
    return e;
  };

  /* ---------------- shared state ---------------- */
  let entered = false;
  let mode = 'intro';            // intro | bg | calm | night
  const relayouts = [];          // functions to call when the site becomes visible / resizes

  /* ---------------- toast ---------------- */
  let toastTimer;
  function toast(msg, ms = 4200) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  }

  /* ---------------- particles & floating hearts ---------------- */
  function burst(x, y, n = 14, glyphs = ['💗', '✨', '⭐', '💖', '🌸']) {
    if (reduced()) return;
    for (let i = 0; i < n; i++) {
      const s = h('span', { class: 'particle', 'aria-hidden': 'true', text: glyphs[i % glyphs.length] });
      s.style.left = x + 'px'; s.style.top = y + 'px';
      s.style.fontSize = (12 + Math.random() * 16) + 'px';
      document.body.append(s);
      const dx = (Math.random() - 0.5) * 180, dy = -(80 + Math.random() * 170);
      const a = s.animate(
        [{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 },
         { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1)`, opacity: 0 }],
        { duration: 1300 + Math.random() * 900, easing: 'cubic-bezier(.2,.7,.3,1)' });
      a.onfinish = () => s.remove();
    }
  }
  const centerOf = (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  function spawnHeart() {
    if (reduced() || document.hidden) return;
    const box = mode === 'intro' ? $('#introHearts') : mode === 'night' ? $('#nightHearts') : mode === 'bg' ? $('#bgHearts') : null;
    if (!box || box.childElementCount > 9) return;
    const s = h('span', { class: 'fh', 'aria-hidden': 'true', text: ['♥', '♡', '✦', '♥'][Math.floor(Math.random() * 4)] });
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = (10 + Math.random() * 16) + 'px';
    s.style.animationDuration = (9 + Math.random() * 7) + 's';
    s.addEventListener('animationend', () => s.remove());
    box.append(s);
  }
  setInterval(spawnHeart, 1800);

  /* ---------------- greeting / names ---------------- */
  function applyNames() { $$('[data-name]').forEach((e) => { e.textContent = S.nickname || 'you'; }); }

  /* ---------------- intro: the secret envelope ---------------- */
  function initIntro() {
    const intro = $('#intro'), env = $('#envelope'), openBtn = $('#openBtn'), skip = $('#skipBtn');
    let opening = false;
    function open() {
      if (opening) return; opening = true;
      env.classList.add('opened'); openBtn.disabled = true;
      const [x, y] = centerOf(env);
      burst(x, y - 20, 16);
      setTimeout(() => burst(x, y - 60, 14), 900);
      setTimeout(enter, reduced() ? 400 : 2600);
    }
    function enter() {
      if (entered) return;
      entered = true; mode = 'bg';
      document.documentElement.classList.add('entered');
      $('#dots').hidden = false;
      window.scrollTo(0, 0);
      intro.classList.add('leaving');
      setTimeout(() => { intro.hidden = true; }, 950);
      $('#site').focus({ preventScroll: true });
      relayouts.forEach((f) => f());
      observeModes();
    }
    env.addEventListener('click', open);
    openBtn.addEventListener('click', open);
    skip.addEventListener('click', enter);
  }

  /* ---------------- progress bar + nav dots ---------------- */
  const SECTIONS = [['hero', 'Welcome'], ['question', 'The question'], ['court', 'The courtroom'], ['notes', 'Things I love'],
    ['scrapbook', 'Our universe'], ['sorry', 'The letter'], ['promises', 'Promises'], ['quiz', 'Little quiz'], ['gift', 'A little gift'], ['goodnight', 'Goodnight']];
  function initProgress() {
    const dots = $('#dots'), bar = $('#progressBar');
    SECTIONS.forEach(([id, label]) => dots.append(h('a', { href: '#' + id, title: label, 'aria-label': label })));
    const links = $$('a', dots);
    let ticking = false;
    function update() {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      let cur = 0;
      SECTIONS.forEach(([id], i) => { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = i; });
      links.forEach((a, i) => { a.classList.toggle('on', i === cur); if (i === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------- scroll reveals + calm/night modes ---------------- */
  function initReveal() {
    const items = $$('.reveal, .letter-line');
    if (!('IntersectionObserver' in window)) { items.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    items.forEach((e) => io.observe(e));
  }
  function observeModes() {
    if (!('IntersectionObserver' in window)) return;
    const flags = { sorry: false, night: false };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { flags[e.target.dataset.mode] = e.isIntersecting; });
      mode = flags.night ? 'night' : flags.sorry ? 'calm' : 'bg';
    }, { threshold: 0.3 });
    $$('[data-mode]').forEach((e) => io.observe(e));
  }

  /* ---------------- 3. THE QUESTION (runaway YES button) ---------------- */
  function initQuestion() {
    const zone = $('#dodgeZone'), yes = $('#btnYes'), say = $('#dodgeMsg'), resp = $('#qResponse');
    const LIMIT = S.dodgeLimit || 7;
    let dodges = 0, settled = false, answered = false, lastAt = 0, cur = { x: 0, y: 0 };
    let msgs = shuffle(S.dodgeMessages || ['WAIT!']), mi = 0;

    const metrics = () => {
      const w = yes.offsetWidth, hh = yes.offsetHeight, pad = 10;
      return { w, h: hh, pad, maxX: Math.max(pad, zone.clientWidth - w - pad), maxY: Math.max(pad, zone.clientHeight - hh - pad) };
    };
    const home = () => { const m = metrics(); return { x: Math.round((zone.clientWidth - m.w) / 2), y: Math.round((zone.clientHeight - m.h) / 2) }; };
    const moveTo = (p) => { cur = p; yes.style.transform = `translate(${p.x}px,${p.y}px)`; };
    const say_ = (t) => { say.textContent = t; restart(say, 'pop'); };

    function pickSpot(px, py) {
      const m = metrics(); let best = null, bs = -1;
      for (let i = 0; i < 12; i++) {
        const c = { x: m.pad + Math.random() * (m.maxX - m.pad), y: m.pad + Math.random() * (m.maxY - m.pad) };
        const fromPointer = px == null ? 0 : Math.hypot(c.x + m.w / 2 - px, c.y + m.h / 2 - py);
        const fromHere = Math.hypot(c.x - cur.x, c.y - cur.y);
        const score = fromPointer + fromHere * 0.6;
        if (score > bs) { bs = score; best = c; }
      }
      return best;
    }

    function dodge(px, py) {
      const now = performance.now();
      if (answered || settled || now - lastAt < 380) return;
      lastAt = now; dodges++;
      if (dodges >= LIMIT) {            // stop running: she can always answer honestly
        settled = true; say_(S.settleMessage || 'Okay, I will stop running.');
        yes.classList.add('settled'); moveTo(home()); return;
      }
      say_(msgs[mi % msgs.length]); mi++;
      moveTo(pickSpot(px, py));
    }

    zone.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || settled || answered) return;
      const b = yes.getBoundingClientRect(), z = zone.getBoundingClientRect();
      const near = e.clientX > b.left - 28 && e.clientX < b.right + 28 && e.clientY > b.top - 28 && e.clientY < b.bottom + 28;
      if (near) dodge(e.clientX - z.left, e.clientY - z.top);
    });
    let lastPointerAt = -1e9;           // when a finger / mouse last touched the button
    yes.addEventListener('pointerdown', (e) => {
      lastPointerAt = performance.now();
      if (settled || answered) return;
      e.preventDefault();               // touch + mouse: the button slips away
      const z = zone.getBoundingClientRect();
      dodge(e.clientX - z.left, e.clientY - z.top);
    });
    yes.addEventListener('click', () => {
      if (answered) return;
      if (settled) return answer('yes');                    // it has stopped running: a tap is a real answer
      // A click with no recent finger/mouse press is Enter/Space (keyboard or assistive tech):
      // always a deliberate answer. A click right after a press is just the tap that made it dodge.
      if (performance.now() - lastPointerAt > 800) return answer('yes');
    });

    function answer(kind) {
      answered = true; settled = true;
      say.textContent = '';
      yes.classList.add('settled'); moveTo(home());
      $$('.q-btn, #btnYes').forEach((b) => b.classList.remove('chosen'));
      const chosen = kind === 'yes' ? yes : $(`.q-btn[data-answer="${kind}"]`);
      if (chosen) chosen.classList.add('chosen');
      resp.hidden = false;
      resp.replaceChildren(h('p', { text: (S.answers || {})[kind] || '' }), h('a', { class: 'btn ghost', href: '#court', text: 'Keep going ↓' }));
      restart(resp, 'pop');
      if (kind !== 'yes') { const [x, y] = centerOf(resp); burst(x, y, 12); }
    }
    $$('.q-btn').forEach((b) => b.addEventListener('click', () => answer(b.dataset.answer)));

    const layout = () => { if (dodges === 0 || settled) moveTo(home()); else { const m = metrics(); moveTo({ x: Math.min(cur.x, m.maxX), y: Math.min(cur.y, m.maxY) }); } };
    relayouts.push(layout);
    window.addEventListener('resize', layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  }

  /* ---------------- 4. COURTROOM ---------------- */
  function initCourt() {
    const c = S.court || {};
    const rows = [['Defendant', c.defendant], ['Charges', c.charges], ['Evidence', c.evidence], ['Defence strategy', c.defence], ['Judge', c.judge], ['Verdict', c.verdict]];
    $('#caseList').append(...rows.flatMap(([k, v]) => [h('dt', { text: k + ':' }), h('dd', { class: k === 'Verdict' ? 'verdict-row' : '', text: v })]));
    $('#sentenceList').append(...(c.sentence || []).map((t) => h('li', { text: t })));
    $('#courtFoot').textContent = c.footnote || '';
    const btn = $('#btnVerdict'), v = $('#verdict');
    btn.addEventListener('click', () => {
      v.hidden = false; btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'COURT IS ADJOURNED 🔨'; btn.disabled = true;
      const [x, y] = centerOf(btn); burst(x, y, 10, ['⚖️', '✨', '💗']);
      setTimeout(() => v.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' }), 120);
    });
  }

  /* ---------------- 5. LOVE NOTES ---------------- */
  function initNotes() {
    const notes = S.loveNotes || [];
    const grid = $('#envGrid'), card = $('#noteCard'), count = $('#noteCount');
    const opened = new Set(); let queue = [];
    function show(i) {
      opened.add(i);
      card.replaceChildren(h('p', { class: 'note-text', text: fmt(notes[i]) }));
      restart(card, 'swap');
      const b = grid.children[i]; b.classList.add('opened'); b.setAttribute('aria-label', `Note ${i + 1} (opened)`);
      count.textContent = `${opened.size} of ${notes.length} notes opened`;
      const [x, y] = centerOf(card); burst(x, y - 30, 6, ['💗', '✨']);
    }
    notes.forEach((_, i) => grid.append(h('button', { class: 'mini-env', type: 'button', 'aria-label': `Open note ${i + 1}`, onclick: () => show(i) },
      h('span', { 'aria-hidden': 'true', text: '✉' }), h('small', { 'aria-hidden': 'true', text: String(i + 1) }))));
    $('#btnNote').addEventListener('click', () => {
      if (!queue.length) queue = shuffle(notes.map((_, i) => i).filter((i) => !opened.has(i)).concat(opened.size === notes.length ? notes.map((_, i) => i) : []));
      if (queue.length) show(queue.pop());
    });
    $('#secretStar').addEventListener('click', (e) => { e.currentTarget.classList.add('found'); toast(S.secretStarMessage || 'Psst... ❤️', 5200); burst(e.clientX, e.clientY, 8, ['⭐', '✨']); });
  }

  /* ---------------- 6. SCRAPBOOK + LIGHTBOX ---------------- */
  function initScrapbook() {
    const photos = S.photos || [];
    const scrap = $('#scrap');
    const rots = [-3, 2, -1.5, 3, -2.5, 1.5, -3.5, 2.5];
    const stickers = ['⭐', '💗', '🌸', '✨', '🎀', '💌', '⭐', '🌷'];
    const fileName = (p) => String(p.src || '').split('/').pop();
    const placeholder = (p) => h('span', { class: 'ph' }, h('span', { class: 'ph-heart', 'aria-hidden': 'true', text: '♥' }), h('span', { class: 'ph-label', text: 'Your photo here' }), h('code', { text: fileName(p) }));

    function frame(p) {
      const wrap = h('span', { class: 'photo-frame' });
      const img = h('img', { alt: p.alt || p.caption || 'A photo of us', loading: 'lazy', decoding: 'async' });
      img.addEventListener('error', () => img.replaceWith(placeholder(p)));
      img.src = p.src; wrap.append(img); return wrap;
    }
    const items = photos.map((p, i) => {
      const btn = h('button', { class: 'polaroid-btn', type: 'button', 'aria-label': `Open photo ${i + 1}: ${p.caption}`, onclick: (e) => openLb(i, e.currentTarget) },
        frame(p), h('span', { class: 'cap', text: fmt(p.caption) }));
      const st = h('span', { class: 'sticker', 'aria-hidden': 'true', text: stickers[i % stickers.length] });
      st.style.cssText = i % 2 ? 'right:-8px;bottom:34px' : 'left:-10px;bottom:48px';
      const el = h('div', { class: 'polaroid ' + (p.size === 'large' ? 'large' : 'small') }, h('span', { class: 'tape', 'aria-hidden': 'true' }), btn, st);
      el.style.setProperty('--rot', rots[i % rots.length] + 'deg');
      scrap.append(el); return el;
    });

    let last = -1;
    $('#btnMemory').addEventListener('click', () => {
      if (!items.length) return;
      let i; do { i = Math.floor(Math.random() * items.length); } while (items.length > 1 && i === last);
      last = i;
      items.forEach((el) => el.classList.remove('spotlight'));
      items[i].classList.add('spotlight');
      $('#memoryCap').textContent = fmt(photos[i].caption);
      items[i].scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });
      const [x, y] = centerOf(items[i]); burst(x, y, 8, ['💗', '✨']);
    });

    /* lightbox */
    const lb = $('#lightbox'), stage = $('#lbStage'), cap = $('#lbCap');
    const btns = [$('#lbPrev'), $('#lbNext'), $('#lbClose')];
    let idx = 0, opener = null;
    function showLb(i) {
      idx = (i + photos.length) % photos.length; const p = photos[idx];
      const img = h('img', { alt: p.alt || p.caption || 'A photo of us' });
      img.addEventListener('error', () => img.replaceWith(placeholder(p)));
      img.src = p.src; stage.replaceChildren(img); cap.textContent = fmt(p.caption);
    }
    function openLb(i, from) { opener = from; lb.hidden = false; document.body.classList.add('lb-open'); showLb(i); $('#lbClose').focus(); }
    function closeLb() { lb.hidden = true; document.body.classList.remove('lb-open'); if (opener) opener.focus(); }
    $('#lbClose').addEventListener('click', closeLb);
    $('#lbPrev').addEventListener('click', () => showLb(idx - 1));
    $('#lbNext').addEventListener('click', () => showLb(idx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') showLb(idx - 1);
      else if (e.key === 'ArrowRight') showLb(idx + 1);
      else if (e.key === 'Tab') {
        const first = btns[0], lastB = btns[btns.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastB.focus(); }
        else if (!e.shiftKey && document.activeElement === lastB) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------------- 7. THE LETTER ---------------- */
  function initLetter() {
    $('#letter').append(...(S.letter || []).map((t) => h('p', { class: 'letter-line', text: fmt(t) })));
    $('#letterNote').textContent = S.letterNote || '';
    const heart = $('#bigHeart'), egg = $('#heartEgg');
    let taps = 0, timer;
    heart.addEventListener('click', (e) => {
      taps++; clearTimeout(timer); timer = setTimeout(() => { taps = 0; }, 1600);
      restart(heart, 'beat');
      if (taps >= 3) { taps = 0; egg.hidden = false; egg.textContent = S.heartEasterEgg || ''; burst(e.clientX, e.clientY, 12); }
    });
  }

  /* ---------------- 8. PROMISE CARDS ---------------- */
  function initPromises() {
    const grid = $('#promiseGrid');
    (S.promises || []).forEach((p) => {
      const btn = h('button', { class: 'promise', type: 'button', 'aria-pressed': 'false', 'aria-label': `${p.title}. Tap to ${'read'} the promise.` },
        h('span', { class: 'face front' }, h('span', { class: 'ico', 'aria-hidden': 'true', text: p.icon }), h('strong', { text: p.title }), h('small', { text: 'tap to read' })),
        h('span', { class: 'face back' }, h('span', { text: fmt(p.text) })));
      btn.addEventListener('click', () => {
        const on = btn.classList.toggle('flipped');
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.setAttribute('aria-label', `${p.title}. ${on ? fmt(p.text) : 'Tap to read the promise.'}`);
      });
      grid.append(btn);
    });
  }

  /* ---------------- 9. QUIZ (nothing is stored) ---------------- */
  function initQuiz() {
    const box = $('#quizBox'), Q = S.quiz || [];
    let i = 0;
    function render() {
      if (i >= Q.length) return result();
      const q = Q[i];
      const fb = h('p', { class: 'quiz-fb', 'aria-live': 'polite' });
      const next = h('button', { class: 'btn', type: 'button', hidden: true, text: i === Q.length - 1 ? 'See my result 💌' : 'Next question →', onclick: () => { i++; render(); } });
      const opts = q.options.map((o) => h('button', { class: 'quiz-opt', type: 'button', text: o.text, onclick: (ev) => {
        opts.forEach((b) => b.classList.remove('picked')); ev.currentTarget.classList.add('picked');
        fb.textContent = o.reply; restart(fb, 'pop'); next.hidden = false;
      } }));
      const title = h('h3', { tabindex: '-1', text: q.q });
      box.replaceChildren(h('p', { class: 'quiz-step', text: `Question ${i + 1} of ${Q.length}` }), title, h('div', { class: 'quiz-opts' }, opts), fb, next);
      if (i > 0) title.focus({ preventScroll: true });
    }
    function result() {
      const r = S.quizResult || {};
      const title = h('h3', { tabindex: '-1', text: r.title || '' });
      box.replaceChildren(h('p', { class: 'quiz-step', text: 'All done 💗' }), title, h('p', { class: 'quiz-fb', text: r.text || '' }),
        h('button', { class: 'btn ghost', type: 'button', text: 'Play again', onclick: () => { i = 0; render(); } }));
      title.focus({ preventScroll: true });
      const [x, y] = centerOf(box); burst(x, y - 40, 14);
    }
    render();
  }

  /* ---------------- 10. GIFT ---------------- */
  function initGift() {
    const g = S.gift || {}, ex = g.extras || {};
    const msg = $('#giftMsg'), box = $('#giftBox'), btn = $('#btnGift');
    msg.append(...(g.message || []).map((t) => h('p', { text: fmt(t) })));

    const extras = h('div', { class: 'extras' });
    if (ex.songUrl) extras.append(h('div', {}, h('h4', { text: 'A song for you' }), h('a', { href: ex.songUrl, target: '_blank', rel: 'noopener noreferrer', text: '🎵 ' + (ex.songTitle || 'Listen when you feel like it') })));
    if (ex.photo) {
      const img = h('img', { alt: ex.photoCaption || 'A favourite photograph', loading: 'lazy' });
      const wrap = h('div', {}, h('h4', { text: 'A favourite photograph' }), img, ex.photoCaption ? h('p', { text: ex.photoCaption }) : null);
      img.addEventListener('error', () => wrap.remove()); img.src = ex.photo; extras.append(wrap);
    }
    if (ex.plan) extras.append(h('div', {}, h('h4', { text: 'Whenever you’re ready' }), h('p', { text: ex.plan })));
    if (ex.voiceNote) {
      const au = h('audio', { controls: true, preload: 'none' });
      au.addEventListener('error', () => { au.replaceWith(h('p', { text: 'The voice note is on its way. 💗' })); });
      au.src = ex.voiceNote; extras.append(h('div', {}, h('h4', { text: 'A little voice note (press play when you want)' }), au));
    }
    if (extras.childElementCount) msg.append(extras);

    btn.addEventListener('click', () => {
      box.classList.add('open'); btn.disabled = true; btn.textContent = 'Opened 💗';
      const [x, y] = centerOf(box); burst(x, y - 30, 22); setTimeout(() => burst(x, y - 50, 16), 600);
      msg.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => msg.classList.add('show')));
      setTimeout(() => msg.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' }), 500);
    });
  }

  /* ---------------- 11. GOODNIGHT ---------------- */
  function initGoodnight() {
    const g = S.goodnight || {};
    $('#night1').textContent = fmt(g.line1); $('#night2').textContent = fmt(g.line2); $('#night3').textContent = fmt(g.line3);
    $('#signoff').textContent = g.signoff || ''; $('#sig').textContent = S.signature || '';
    const stars = $('#stars');
    for (let i = 0; i < 60; i++) {
      const s = h('span', { class: 'star' });
      s.style.left = Math.random() * 100 + '%'; s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 3 + 's'; s.style.transform = `scale(${0.5 + Math.random()})`;
      stars.append(s);
    }
    $('#btnTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' }));
  }

  /* ---------------- G. OPTIONAL MUSIC (manual start only) ---------------- */
  function initMusic() {
    const m = S.music || {}, wrap = $('#music');
    if (!m.src) { wrap.hidden = true; return; }
    const audio = new Audio(); audio.preload = 'none'; audio.loop = true; audio.src = m.src;
    const btn = $('#musicBtn'); $('#musicTitle').textContent = m.title || '';
    btn.addEventListener('click', async () => {
      if (audio.paused) { try { await audio.play(); } catch (e) { toast('The song file couldn’t be played yet. 🎵'); } } else audio.pause();
    });
    audio.addEventListener('play', () => { btn.setAttribute('aria-pressed', 'true'); btn.setAttribute('aria-label', 'Pause music'); });
    audio.addEventListener('pause', () => { btn.setAttribute('aria-pressed', 'false'); btn.setAttribute('aria-label', 'Play music'); });
    audio.addEventListener('error', () => toast('Couldn’t find the song file yet. 🎵'));
  }

  /* ---------------- B. CURSOR TRAIL (desktop mouse only) ---------------- */
  function initTrail() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let t = 0;
    window.addEventListener('pointermove', (e) => {
      if (reduced() || !entered || mode === 'calm' || e.pointerType !== 'mouse') return;
      const n = performance.now(); if (n - t < 120) return; t = n;
      const s = h('span', { class: 'trail', 'aria-hidden': 'true', text: Math.random() < 0.5 ? '♥' : '✦' });
      s.style.left = e.clientX + 'px'; s.style.top = e.clientY + 'px';
      document.body.append(s); setTimeout(() => s.remove(), 900);
    }, { passive: true });
  }

  /* ---------------- boot ---------------- */
  const safe = (fn) => { try { fn(); } catch (err) { console.error(fn.name, err); } };
  [applyNames, initIntro, initProgress, initQuestion, initCourt, initNotes, initScrapbook, initLetter,
   initPromises, initQuiz, initGift, initGoodnight, initMusic, initTrail, initReveal].forEach(safe);

  // If JS runs but the intro isn't shown (very old browsers), make sure the site is reachable.
  if (!$('#intro') || getComputedStyle($('#intro')).display === 'none') {
    entered = true; mode = 'bg'; document.documentElement.classList.add('entered'); $('#dots').hidden = false;
  }
})();
