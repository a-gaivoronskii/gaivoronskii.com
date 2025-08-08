# Andrei Gaivoronskii — Portfolio

A clean, fast-loading portfolio website for iOS engineering work and personal projects. Built with vanilla web technologies and a brutalist design aesthetic.

## ✨ Features

- **Pure HTML/CSS/JS** — No frameworks, optimized for speed
- **3-State Theme System** — Auto (system), Light, Dark with persistence
- **Responsive Design** — Mobile-first approach with CSS Grid
- **Accessible** — Keyboard navigation, ARIA labels, screen reader friendly
- **Interactive Cards** — Clickable project cards with hover effects
- **Animated Marquees** — Scrolling tapes with iOS development tips
- **Clean Typography** — Space Grotesk + IBM Plex Mono combination

## 🎨 Design Philosophy

**Brutalist-Inspired**
- Bold typography with high contrast
- Prominent borders and shadows
- No unnecessary decorative elements
- Function over form aesthetic

**Grid-Based Layout**
- 24px baseline grid system
- Consistent spacing throughout
- 12-column responsive grid for projects

**Color System**
- Yellow tape highlights (`#fff48d`) with black text
- Theme-aware color variables
- High contrast for accessibility

## 🛠 Tech Stack

- **HTML5** — Semantic markup with proper ARIA
- **CSS3** — Custom properties, Grid, Flexbox
- **Vanilla JavaScript** — Modular ES6 classes
- **Google Fonts** — Space Grotesk & IBM Plex Mono

## 📱 Featured Projects

### ADIA.AI Work
- **Adia Copilot** — Healthcare professional tool

### Personal Apps
- **Activity: Streak Recovery** — Apple Watch fitness companion
- **RUN - Running Club** — Minimal running tracker
- **Walker** — Advanced step counter
- **365 Workouts** — Daily fitness routines
- **Fitness** — Comprehensive wellness app
- **Wallet** — Digital card organizer
- **QR Code** — Scanner and generator

## 🚀 Quick Start

```bash
# Clone the repository
git clone [your-repo-url]
cd portfolio

# Serve locally (choose one)
python -m http.server 8000
npx serve .
# or open index.html directly
```

Visit `http://localhost:8000`

## 📂 Project Structure

```
portfolio/
├── index.html          # Semantic HTML structure
├── styles.css          # Organized CSS with custom properties
├── script.js           # Modular JavaScript classes
├── favicon.png         # Site icon
└── README.md           # This file
```

## 🎯 Key Features

### Theme Management
Three-state theme system (auto → light → dark → auto) with:
- System preference detection
- localStorage persistence
- Real-time theme switching
- Media query listening for system changes

### Card Interactions
- Click-to-open App Store links
- Keyboard navigation support
- Hover effects with CSS transforms
- Accessible ARIA labels

### Performance Optimizations
- Respects `prefers-reduced-motion`
- Throttled scroll event handling
- Intersection Observer for animations
- Font preloading and optimization

## 💻 Code Architecture

### CSS Organization
```css
/* Custom Properties */
:root { --color-*, --font-*, --spacing-* }

/* Sections */
- Reset & Base Styles
- Typography
- Layout Components
- UI Components (chips, tape, cards)
- Responsive Design
- Accessibility Features
```

### JavaScript Modules
```javascript
// Core Classes
ThemeManager     // Theme switching logic
CardManager      // Project card interactions
URLUtils         // Safe URL handling

// Enhancements
ScrollAnimations // Intersection Observer
ErrorHandler     // Global error management
PerformanceOptimizer // Reduced motion, throttling
```

## 🔧 Customization

### Colors
Edit CSS custom properties in `:root`:
```css
--color-bg: #ffffff;
--color-ink: #0b0d10;
--color-accent: #ff3131;
--color-tape: #fff48d;
```

### Typography
Update font variables:
```css
--font-sans: "Space Grotesk", system-ui;
--font-mono: "IBM Plex Mono", monospace;
```

### Grid System
Modify grid size:
```css
--grid-size: 24px; /* Base grid unit */
```

## 🌐 Deployment

**GitHub Pages** (recommended)
1. Push to `main` branch
2. Enable Pages in repository settings
3. Site available at `username.github.io/repo-name`

**Other Options**
- Vercel: `vercel --prod`
- Netlify: Drag & drop deployment
- Any static hosting service

## ♿ Accessibility

- **Semantic HTML** — Proper heading hierarchy, landmarks
- **ARIA Labels** — Descriptive labels for interactive elements
- **Keyboard Navigation** — Tab navigation, Enter/Space activation
- **Focus Management** — Visible focus indicators
- **Color Contrast** — WCAG AA compliant contrasts
- **Reduced Motion** — Respects user preferences

## 📊 Performance

- **No build process** — Direct browser execution
- **Minimal dependencies** — Only Google Fonts
- **Optimized CSS** — Efficient selectors and properties
- **Fast loading** — Single HTML file with embedded resources
- **Mobile optimized** — Responsive design with touch targets

## 🛡️ Browser Support

- **Modern browsers** — Chrome, Firefox, Safari, Edge (last 2 versions)
- **Progressive enhancement** — Graceful degradation for older browsers
- **Mobile browsers** — iOS Safari, Chrome Mobile, Samsung Internet

## 📧 Contact

- **Email**: andrei@gaivoronskii.com
- **GitHub**: [@a-gaivoronskii](https://github.com/a-gaivoronskii)
- **Location**: Saint Petersburg, Russia

---

*Built between workouts, runs, and long walks.*

## 📄 License

MIT License - feel free to use this code for your own portfolio.
