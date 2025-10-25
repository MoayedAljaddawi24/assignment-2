# Technical Documentation

---

## 🧠 Assignment 1 Summary

The first version of the portfolio focused on **static structure and responsive design**.  
It included:
- A responsive layout with **Hero**, **About**, **Projects**, and **Contact** sections.
- A **navigation bar** and **dark/light theme toggle** stored in localStorage.
- A **contact form** with basic client-side validation.
- Lazy-loaded images, smooth scrolling, and an automatically updating year.
- Clear, accessible HTML and semantic elements.

---

## 🚀 Assignment 2 Enhancements

The second phase builds on Assignment 1 by introducing **interactivity, data handling, animations, and AI-assisted improvements**.

### 1. Dynamic Content
- Added **filter buttons** and a **live search bar** to filter projects by language or keyword.  
- Implemented **collapsible project details** (“More details” buttons that expand or hide extra info).  
- Created an **empty state** (“No projects found”) when no cards match filters.

### 2. Data Handling
- Personalized **greeting** using localStorage to remember the user’s name from the contact form.  
- Integrated the **Quotable API** to fetch a random motivational quote on each load.  
  - Includes **loading spinner**, **timeout**, and **retry** button on failure.

### 3. Animation and Transitions
- Smooth card hover effects and detail-panel transitions using CSS grid row + opacity.  
- Subtle loading spinner for the quote section.  
- Uses `prefers-reduced-motion` to respect accessibility settings.

### 4. Error Handling and Feedback
- Loading, error, and retry states for the API.  
- Empty results message for filters/search.  
- Toast-style alerts for form success or validation errors.

### 5. Accessibility and UX
- ARIA attributes for all interactive controls:  
  - `aria-pressed` on filter buttons  
  - `aria-expanded` + `aria-controls` on collapsible details  
  - `aria-live` for the quote text  
- Keyboard-friendly and screen-reader-friendly interactions.

### 6. Files Modified
| File | Purpose |
|------|----------|
| `index.html` | Added greeting, quote, filters, collapsibles, empty state |
| `css/styles.css` | Added transitions, spinner, alerts, reduced-motion rules |
| `js/script.js` | Implemented interactivity, API calls, localStorage, error handling |
| `README.md` | Updated features and documentation links |
| `docs/*.md` | Added Assignment 2 documentation sections |

### 7. Testing & Performance
- Tested on Chrome, Firefox, and Edge.  
- Lightweight vanilla JS (no libraries).  
- All interactive features degrade gracefully if JavaScript or API fails.

---

✅ **Result:** The portfolio now feels dynamic and interactive, demonstrating modern front-end techniques while maintaining accessibility and performance.
