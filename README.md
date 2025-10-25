# 🌐 Personal Portfolio — Assignment 1 & 2

A personal, responsive portfolio website developed as part of the web development course.  
This document combines details from **Assignment 1 (foundation)** and **Assignment 2 (interactive enhancements)**.

---

## 🧠 Assignment 1 — Foundation

### 🎯 Objective
Build a clean, accessible, and responsive personal portfolio using **HTML**, **CSS**, and **vanilla JavaScript**.

### ✨ Features Implemented
- Required sections: **Hero**, **About**, **Projects**, **Contact**
- Responsive grid and card layout
- Sticky header with smooth scrolling
- **Dark/Light theme toggle** (stored in localStorage)
- **Contact form** with basic validation
- Auto-updating year in the footer
- Lazy-loaded images and basic SEO meta description

---

## 🚀 Assignment 2 – Interactive Features

### 🎯 Objective
Enhance the existing personal portfolio from Assignment 1 by adding **dynamic content**, **data handling**, **animations**, and **AI-assisted improvements**.


### 🧩 New Interactive Features

#### 🔹 Dynamic Content
- Added **filter buttons** and **live search** for projects  
- Implemented **collapsible “More Details”** sections for each project  
- Created a **personalized greeting** that changes with time of day and stored username  

#### 🔹 Data Handling
- Used **LocalStorage** to remember the user’s name from the contact form  
- Integrated **Quotable API** to fetch motivational quotes  
  - Includes a **loading spinner**, **error message**, and **retry** button when the request fails  

#### 🔹 Animation & Transitions
- Smooth hover and open/close animations on cards  
- Animated loading spinner for the quote section  
- Honors the `prefers-reduced-motion` accessibility setting  

#### 🔹 Error Handling & Feedback
- Loading / Error / Retry states for API calls  
- “No projects found” message for filters and search  
- Toast-style **success** / **error** notifications for form submission  

#### 🔹 Accessibility & UX
- Improved accessibility with ARIA attributes:  
  - `aria-pressed` on filter buttons  
  - `aria-expanded` + `aria-controls` on collapsibles  
  - `aria-live` for dynamic quote updates  
- Fully keyboard-friendly and screen-reader-accessible  

#### 🔹 AI Enhancements
- Utilized **ChatGPT (GPT-5)** and **GitHub Copilot** for:  
  - Planning new feature structure  
  - Improving accessibility patterns  
  - Drafting documentation and refining JavaScript logic  
- All AI outputs were reviewed, edited, and documented ethically  

---

### ⚙️ Technologies Used
- **HTML5**, **CSS3**, **JavaScript (ES6+)**
- **LocalStorage API**
- **Fetch API**
- **ARIA Accessibility Standards**
- **AI Tools:** ChatGPT (GPT-5), GitHub Copilot

---

### 📁 File Structure
assignment-2/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ script.js
├─ assets/
│  └─ images/
│     ├─ reservation.jpg
│     └─ kfupm-event-hub.jpg
└─ docs/
   ├─ ai-usage-report.md
   └─ technical-documentation.md


## 🚀 Run locally
1. Clone this repo
   ```bash
   git clone https://github.com/MoayedAljaddawi24/assignment-2.git
   cd assignment-2
   ```
2. Open `index.html` in your browser.
   ```bash


## 📄 Docs
- `docs/technical-documentation.md`
- `docs/ai-usage-report.md`


## 🧩 Projects
- **Event Ticket Reservation System** — browse events, reserve tickets, view bookings.
- **KFUPM Event Hub (In Progress)** — discover, register for, and manage university events.
