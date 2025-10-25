
// form validation (demo only)
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const isEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
  const setError = (el, msg = '') => (el.textContent = msg);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;

    setError(nameError); setError(emailError); setError(messageError);

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) { setError(nameError, 'Please enter your name.'); ok = false; }
    if (!email || !isEmail(email)) { setError(emailError, 'Enter a valid email address.'); ok = false; }
    if (!message || message.length < 10) { setError(messageError, 'Message should be at least 10 characters.'); ok = false; }

    if (ok) { alert('Thanks! This form is a demo only.'); form.reset(); }
  });

  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('blur', () => {
      if (input === nameInput && !nameInput.value.trim()) setError(nameError, 'Please enter your name.');
      else if (input === emailInput && !isEmail(emailInput.value.trim())) setError(emailError, 'Enter a valid email address.');
      else if (input === messageInput && messageInput.value.trim().length < 10) setError(messageError, 'Message should be at least 10 characters.');
    });
    input.addEventListener('input', () => {
      if (input === nameInput) setError(nameError);
      if (input === emailInput) setError(emailError);
      if (input === messageInput) setError(messageError);
    });
  });
})();

// mobile menu (hamburger)
(function () {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

// theme toggle (light/dark)
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const root = document.documentElement;
  const apply = (mode) => {
    const dark = mode === 'dark';
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };

  const saved = localStorage.getItem('theme');
  if (saved) apply(saved);
  else apply(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  btn.addEventListener('click', () => apply(root.classList.contains('dark') ? 'light' : 'dark'));

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) apply(e.matches ? 'dark' : 'light');
    });
  }
})();

// footer year
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// smooth in-page scroll with header offset
(function () {
  const header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      e.preventDefault();
      const offset = header ? header.offsetHeight : 64;
      const y = target.getBoundingClientRect().top + window.pageYOffset - offset - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });

      const nav = document.getElementById('siteNav');
      const btn = document.getElementById('menuToggle');
      if (nav && btn && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
})

/* ===== Assignment 2 Enhancements ===== */

/* 1) Personalized greeting (uses localStorage name if available) */
(function greetingFeature() {
  const el = document.getElementById('personalGreeting');
  if (!el) return;
  const h = new Date().getHours();
  const part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const saved = localStorage.getItem('username');
  el.textContent = saved ? `${part}, ${saved}!` : `${part}!`;
})();

/* 2) Quote API with loading, error, retry */
(function quoteFeature() {
  const box = document.getElementById('dailyQuote');
  if (!box) return;
  const spinner = box.querySelector('.spinner');
  const text = box.querySelector('.quote-text');
  const retry = document.getElementById('retryQuote');

  async function loadQuote() {
    spinner.hidden = false; retry.hidden = true; text.textContent = 'Loading quote…';
    try {
      const ctrl = new AbortController();
      const timeout = setTimeout(() => ctrl.abort(), 6000);
      const res = await fetch('https://api.quotable.io/random', { signal: ctrl.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error('Bad status');
      const data = await res.json();
      text.textContent = `“${data.content}” — ${data.author}`;
    } catch {
      text.textContent = 'Could not load quote. Please try again.';
      retry.hidden = false;
    } finally {
      spinner.hidden = true;
    }
  }

  retry?.addEventListener('click', loadQuote);
  loadQuote();
})();

/* 3) Projects: filter buttons + live search + empty state */
(function projectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = [...document.querySelectorAll('.projects-grid .card')];
  const search = document.getElementById('projectSearch');
  const empty = document.getElementById('projectsEmpty');
  if (!cards.length) return;

  let category = 'all';
  let query = '';

  function apply() {
    let visible = 0;
    cards.forEach(card => {
      const tags = (card.dataset.tags || '').toLowerCase().split(' ');
      const text = card.textContent.toLowerCase();
      const matchCat = category === 'all' || tags.includes(category);
      const matchQuery = !query || text.includes(query);
      const show = matchCat && matchQuery;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (empty) empty.hidden = visible !== 0;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      category = btn.dataset.category;
      apply();
    });
  });

  search?.addEventListener('input', e => {
    query = e.target.value.trim().toLowerCase();
    apply();
  });

  apply();
})();

/* 4) Collapsible project details */
(function collapsibleDetails() {
  document.querySelectorAll('.details-toggle').forEach(btn => {
    const id = btn.getAttribute('aria-controls');
    const panel = document.getElementById(id);
    if (!panel) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (expanded) {
        panel.setAttribute('aria-hidden', 'true');
        panel.hidden = true;
      } else {
        panel.hidden = false;
        requestAnimationFrame(() => panel.setAttribute('aria-hidden', 'false'));
      }
    });
  });
})();

/* 5) Form: save name to localStorage + inline feedback */
(function enhanceForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.checkValidity()) {
      const name = (document.getElementById('name')?.value || '').trim();
      if (name) localStorage.setItem('username', name);
      toast('Message sent! (Demo)', 'success');
      form.reset();
    } else {
      form.reportValidity();
      toast('Please complete all required fields correctly.', 'error');
    }
  });

  function toast(msg, type='success') {
    const el = document.createElement('div');
    el.className = `alert ${type}`;
    el.role = 'status';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
})();

