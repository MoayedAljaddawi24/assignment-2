# Technical Documentation

## Overview
Static, single-page portfolio with four required sections (Hero, About, Projects, Contact).  
Stack: **HTML**, **CSS**, **vanilla JS**. No frameworks or build tools.

## Requirements Mapping
- **Hero / About / Projects / Contact** — implemented as semantic `<section>` blocks.
- **Responsive design** — CSS grid/flex; cards stack to one column on narrow screens.
- **At least one JS feature** — theme toggle (persisted), smooth scrolling with header offset, and form validation.


## HTML Notes
- **Projects** use `<article class="card">` blocks with optional thumbnails and tech tags.
- Anchor links navigate to section IDs (`#hero`, `#about`, `#projects`, `#contact`).

## CSS Decisions
- Theme variables (`:root`) unify colors, spacing, radius, and shadows.
- Section spacing via `--section-space`.
- Responsive grid: `grid-template-columns: repeat(2, 1fr)` → `1fr` under ~800px.
- Smooth scroll and sticky-header fix: `html { scroll-behavior: smooth; }` and `section { scroll-margin-top: 72px; }`.

## JS Modules (IIFEs)
- **Theme toggle:** toggles `:root.dark`, saves preference in `localStorage`.
- **Mobile nav (optional):** toggles `.nav.open` on small screens.
- **Smooth scroll:** calculates header height and scrolls with offset.
- **Form validation:** client-side checks and friendly errors; no network requests.

## Accessibility
- Landmarks and headings; labels and focus outlines.
- `aria-live="polite"` for validation messages.
- Good contrast in both themes; optional skip link.
- Sticky header offset prevents headings from being hidden.

## Performance
- No frameworks; minimal JS/CSS.
- Images are local and `loading="lazy"`.
- Single request per CSS/JS file.

## Known Limitations
- Contact form is a demo; no backend.
- Content is single-page; future growth might need routing or multi-page structure.

## Future Work
- Add more projects and tags; project filtering.
- Form backend and success state UI.
- Unit tests for JS helpers.


