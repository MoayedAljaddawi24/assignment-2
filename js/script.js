
/* ============================
   Base helpers (year, theme)
   ============================ */

// Footer year
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// === Theme toggle (robust: works with [data-theme] or .dark/.light) ===
(function themeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const KEY = 'theme';
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine current theme from storage, classes, data-attr, or system
  const stored = localStorage.getItem(KEY);
  let current =
    stored ||
    (document.documentElement.classList.contains('dark') ? 'dark' :
     document.documentElement.classList.contains('light') ? 'light' :
     document.documentElement.dataset.theme || (prefersDark ? 'dark' : 'light'));

  apply(current);

  btn.addEventListener('click', () => {
    current = current === 'dark' ? 'light' : 'dark';
    apply(current);
    localStorage.setItem(KEY, current);
  });

  function apply(mode) {
    // Keep both patterns in sync so whichever your CSS uses will work
    document.documentElement.dataset.theme = mode;         // [data-theme="dark|light"]
    document.documentElement.classList.toggle('dark',  mode === 'dark');   // .dark
    document.documentElement.classList.toggle('light', mode === 'light');  // .light
  }
})();


// Mobile menu toggle (if you style it)
(function mobileMenu() {
  const btn = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open', !expanded);
  });
})();

/* =========================================
   Assignment 2 features (interactive)
   ========================================= */

// 1) Personalized greeting (time of day + stored name)
(function greetingFeature() {
  const el = document.getElementById('personalGreeting');
  if (!el) return;

  const h = new Date().getHours();
  const part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
  const saved = localStorage.getItem('username');
  el.textContent = saved ? `${part}, ${saved}!` : `${part}!`;
})();

// 2) Quote API with resilient fallback
(function quoteFeature() {
  const btn = document.getElementById("retryQuote");
  const text = document.querySelector("#dailyQuote .quote-text");
  const spinner = document.querySelector("#dailyQuote .spinner");

  let authorEl = document.querySelector("#dailyQuote .quote-author");
  if (!authorEl) {
    authorEl = document.createElement("span");
    authorEl.className = "quote-author";
    document.querySelector("#dailyQuote").appendChild(authorEl);
  }

  async function loadQuote() {
    spinner.hidden = false;
    btn.hidden = true;
    text.textContent = "Loading quote…";
    authorEl.textContent = "";

    try {
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();

      text.textContent = `“${data.quote || data.content}”`;
      authorEl.textContent = `${data.author}`;
      authorEl.style.display = "block"; 
      authorEl.style.marginTop = "0.25rem";
    } catch (err) {
      text.textContent = "Failed to load quote.";
      authorEl.textContent = "";
      console.error("Error fetching quote:", err);
      btn.hidden = false;
    } finally {
      spinner.hidden = true;
    }
  }

  btn.addEventListener("click", loadQuote);
  loadQuote();
})();


// 3) Project filters + live search + empty state
(function projectFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = Array.from(document.querySelectorAll('.projects-grid .card'));
  const search = document.getElementById('projectSearch');
  const empty = document.getElementById('projectsEmpty');
  if (!cards.length) return;

  let activeCategory = 'all';
  let query = '';

  function apply() {
    let visible = 0;

    cards.forEach(card => {
      const tags = (card.dataset.tags || '').toLowerCase().split(/\s+/);
      const text = card.textContent.toLowerCase();

      const matchCat = activeCategory === 'all' || tags.includes(activeCategory);
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
      activeCategory = btn.dataset.category || 'all';
      apply();
    });
  });

  search?.addEventListener('input', (e) => {
    query = e.target.value.trim().toLowerCase();
    apply();
  });

  apply();
})();

// 4) Collapsible project "More details"
(function collapsibleDetails() {
  document.querySelectorAll('.details-toggle').forEach(btn => {
    const id = btn.getAttribute('aria-controls');
    const panel = id ? document.getElementById(id) : null;
    if (!panel) return;

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));

      if (expanded) {
        panel.setAttribute('aria-hidden', 'true');
        panel.hidden = true;
      } else {
        panel.hidden = false;
        // allow CSS transition
        requestAnimationFrame(() => panel.setAttribute('aria-hidden', 'false'));
      }
    });
  });
})();

// 5) Contact form: save name + toast feedback
(function enhanceForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
      const name = (document.getElementById('name')?.value || '').trim();
      if (name) localStorage.setItem('username', name);
      toast('Message sent! (Demo — no data is transmitted)', 'success');
      form.reset();
    } else {
      form.reportValidity();
      toast('Please complete all required fields correctly.', 'error');
    }
  });

  function toast(msg, type = 'success') {
    const el = document.createElement('div');
    el.className = `alert ${type}`;
    el.role = 'status';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
})();
