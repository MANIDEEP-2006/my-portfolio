# 🌟 Sai Kiran Manideep — Personal Portfolio Website

A modern, animated, single-page portfolio website for **Bonugu Sai Kiran Manideep**,
B.Tech CSE (Data Science) student at Vignan Institute of Information Technology, Visakhapatnam.

Built with **pure HTML, CSS and JavaScript** — no frameworks, no build tools, no dependencies.
Just open it in a browser and it works.

---

## 📁 Project Structure

```
portfolio-source/
├── index.html              # Main page (structure & content)
├── css/
│   └── style.css           # All styles, animations & responsive rules
├── js/
│   └── script.js           # All interactivity & animations
├── images/
│   ├── avatar.jpg          # 3D cartoon avatar (AI-generated from photo)
│   ├── project-trustlink.jpg
│   ├── project-greencrop.jpg
│   └── project-dashboard.jpg
└── README.md               # This file
```

> **Note:** There is also a single-file version (`index.html` in the workspace root)
> with all CSS, JS and images embedded — perfect for sharing as one file.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌌 3D Particle Background | Canvas-based particle network flying in 3D space, reacts to mouse movement |
| 🧑‍🎨 Floating Avatar | 3D cartoon avatar with rotating orbit rings, glow, and floating tech orbs |
| 🔊 Voice Intro (TTS) | Speaks an intro automatically on page open (browser speech synthesis), floating pill button to mute/unmute with animated equalizer |
| ⌨️ Typing Animation | Auto-typing hero line cycling through student roles |
| 🎠 Project Carousel | Auto-sliding project showcase (6s interval) with arrows, dots, progress bar, hover-pause and touch swipe |
| ✨ Pop-out Modals | "View Details" opens an animated modal with full project info, metrics, tech tags and GitHub link |
| 📊 Animated Skill Bars | Fill with shimmer effect when scrolled into view |
| 🔢 Animated Counters | Stats count up with ease-out animation on scroll |
| 🎯 Scroll Reveals | Sections slide in from left/right/bottom as you scroll |
| 🖱️ Custom Cursor | Dot + trailing ring that expands over interactive elements |
| 🎨 Light Pastel Theme | Indigo / sky / pink gradients, glassmorphism cards, drifting color blobs |
| 📱 Fully Responsive | Mobile hamburger menu, swipe gestures, adaptive layouts |
| ⏳ Loader Screen | Animated dual-ring loader with failsafe auto-hide |

---

## 🚀 How to Run

### Option 1 — Just open it
Double-click `index.html`. That's it. Works in Chrome, Edge, Firefox, Safari.

### Option 2 — Local server (recommended for development)
```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000

# or Node.js
npx serve .
```

### ⚠️ Voice autoplay note
Browsers block audio before the first user interaction (a security rule).
The voice intro tries to play on load; if blocked, it starts on the visitor's
first click/scroll. The floating pill (bottom-left) mutes/unmutes anytime.

---

## 🌐 Deploy for Free

### GitHub Pages
1. Create a repo (e.g. `my-portfolio`) on GitHub
2. Upload all files in this folder
3. Repo → **Settings → Pages → Source: main branch → Save**
4. Your site goes live at `https://<username>.github.io/my-portfolio/`

### Netlify
1. Go to [netlify.com](https://netlify.com) → "Add new site" → "Deploy manually"
2. Drag & drop this whole folder
3. Done — instant live URL

### Vercel
```bash
npm i -g vercel
vercel
```

---

## 🛠️ Customization Guide

### Change colors
Edit the CSS variables at the top of `css/style.css`:
```css
:root{
  --indigo:#6366f1;   /* primary */
  --violet:#8b5cf6;   /* secondary */
  --sky:#0ea5e9;      /* accent */
  --pink:#ec4899;     /* highlight */
}
```

### Change the voice intro text
Edit the `introText` constant in `js/script.js`.

### Change typing roles
Edit the `roles` array in `js/script.js`:
```js
const roles=['B.Tech CSE Student 🎓','Data Science Learner 📊', ...];
```

### Change carousel speed
In `js/script.js`, find `6000` (milliseconds per slide) inside `startAuto()`.

### Add a new project
1. Copy a `<div class="slide">...</div>` block in `index.html` and edit it
2. Add a matching object to the `projData` array in `js/script.js`
3. Add the project image to `images/`

---

## 🧰 Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, grid/flexbox, keyframe animations, glassmorphism, backdrop-filter
- **Vanilla JavaScript (ES6+)** — Canvas 2D API, IntersectionObserver, Web Speech API (SpeechSynthesis), touch events
- **Zero dependencies** — no jQuery, no React, no build step

---

## 📬 Contact

- **Email:** manideep1716@gmail.com
- **Phone:** +91 83090 22239
- **GitHub:** [github.com/MANIDEEP-2006](https://github.com/MANIDEEP-2006)
- **LinkedIn:** [linkedin.com/in/b-sai-kiran-manideep-62716a317](https://linkedin.com/in/b-sai-kiran-manideep-62716a317)

---

*Designed & built with 💜 — © 2026 Bonugu Sai Kiran Manideep*
