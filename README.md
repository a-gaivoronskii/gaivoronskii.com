# Andrei Gaivoronskii — Portfolio Site

A minimal, fast-loading portfolio website showcasing iOS engineering work and personal projects.

## ✨ Features

- **Pure HTML/CSS/JS** — No frameworks, fast loading
- **Dark/Light Theme** — Automatic system detection with manual toggle
- **Responsive Design** — Works seamlessly on mobile and desktop  
- **Grid Background** — Subtle visual texture that adapts to theme
- **Animated Marquees** — iOS dev tips and skills scrolling tapes
- **App Store Integration** — Direct links to published iOS apps

## 🛠 Tech Stack

- Vanilla HTML5, CSS3, JavaScript
- CSS Grid & Flexbox for layout
- CSS Custom Properties for theming
- Google Fonts: Space Grotesk & IBM Plex Mono
- Local Storage for theme persistence

## 🎨 Design Philosophy

- **Brutalist-inspired** — Bold typography, high contrast
- **Grid system** — 24px baseline grid for consistent spacing
- **Monospace accents** — Code-like elements for technical identity
- **Tape aesthetics** — Yellow highlight boxes for key information
- **Card hover effects** — Subtle 3D transformations

## 📱 Projects Featured

### ADIA.AI
- **Adia Copilot** — Healthcare professional tool

### Personal Apps
- **Activity: Streak Recovery** — Apple Watch fitness companion
- **RUN - Running Club** — Minimal running tracker
- **Walker** — Step counter with advanced metrics
- **365 Workouts** — Daily fitness routines
- **Fitness** — Comprehensive fitness companion
- **Wallet** — Digital card organizer
- **QR Code** — Scanner and generator

## 🔧 Local Development

```bash
# Clone the repository
git clone [your-repo-url]
cd portfolio-site

# Serve locally (any static server works)
python -m http.server 8000
# or
npx serve .
# or simply open index.html in browser
```

## 🚀 Deployment

The site is a single HTML file with embedded CSS and JavaScript — deploy anywhere static hosting is supported:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop the file
- **GitHub Pages**: Push to main branch
- **Any CDN**: Upload index.html

## 📂 File Structure

```
portfolio-site/
├── index.html          # Main site file
├── favicon.png         # Site icon
├── images/            # App screenshots
│   ├── activity_rings.jpg
│   ├── run.jpg
│   ├── walker.jpg
│   └── ...
└── README.md          # This file
```

## 🎯 Performance

- **No build process** — Direct browser execution
- **Minimal dependencies** — Only Google Fonts
- **Efficient CSS** — Custom properties for theming
- **Optimized images** — Compressed app screenshots
- **Fast loading** — Single request HTML file

## 🌟 Key Code Highlights

### Theme System
Three-state theme toggle (auto → light → dark → auto) that respects system preferences and persists user choice.

### CSS Grid Layout
12-column responsive grid that collapses to single column on mobile with automatic card reflow.

### Animated Marquees
Dual-speed scrolling tapes — one for general skills, another slower one for detailed iOS dev tips.

## 📧 Contact

- **Email**: andrei@gaivoronskii.com
- **GitHub**: [@a-gaivoronskii](https://github.com/a-gaivoronskii)
- **Location**: Saint Petersburg, Russia

---

*Built between workouts, runs, and long walks.*
