
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
})();
