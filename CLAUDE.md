# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReSwap is a static website for a USC student marketplace featuring multiple "share" communities (FitShare, NeedShare, SpaceShare, TripShare). The site uses a unified architecture with theme-based styling and shared components.

## Development Commands

### Local Development Server
```powershell
# Start local server (PowerShell)
.\start-server.ps1

# Or directly with Python
python -m http.server 8000
```

The site will be available at:
- Homepage: http://localhost:8000/index.html
- FitShare: http://localhost:8000/fitshare.html
- NeedShare: http://localhost:8000/needshare.html
- SpaceShare: http://localhost:8000/spaceshare.html
- TripShare: http://localhost:8000/tripshare.html
- Test Hub: http://localhost:8000/test.html

### Testing
Open HTML files directly in a browser or use the local server. No build process or automated tests.

## Architecture

### Unified Theme System
The site uses a centralized CSS custom properties system that dynamically changes based on the active community:

- **Global CSS** ([css/global.css](css/global.css)): Contains all styling with CSS custom properties for theming
- **Global JS** ([js/global.js](js/global.js)): Manages theme switching, navigation, FAQs, and form handling
- **Theme Detection**: Automatic theme switching based on URL path (e.g., `/fitshare.html` → FitShare theme)

### Theme Colors
Each community has distinct branding:
- **Homepage**: Green (#31a050)
- **FitShare**: Teal (#008a73)
- **NeedShare**: Red (#df3f42)
- **SpaceShare**: Blue (#50A6CA)
- **TripShare**: Custom theme (to be defined)

Themes are applied via `data-theme` attribute on the `<html>` element, which updates CSS custom properties.

### JavaScript Architecture
The [js/global.js](js/global.js) file contains:
- `ThemeManager`: Detects page context and applies appropriate theme
- `FAQManager`: Handles FAQ accordion interactions
- `FormManager`: Manages email subscription forms
- `SmoothScroll`: Provides smooth scrolling navigation

### Page Structure
All community pages follow a consistent structure:
1. **Header**: Shared navigation with community dropdown
2. **Hero Section**: Community-specific hero with theme colors
3. **Content Sections**: Features, how it works, FAQ, etc.
4. **Footer**: Subscribe form and links (consistent across pages)

### Image Organization
All images are centralized in the `/images/` directory for easier management across all pages.

## Important Patterns

### Adding a New Community Page
1. Create new HTML file (e.g., `newshare.html`)
2. Add `data-theme="newshare"` to the `<html>` tag
3. Define theme colors in [css/global.css](css/global.css) under `[data-theme="newshare"]`
4. Add theme detection logic in [js/global.js](js/global.js) `ThemeManager.detectPageTheme()`
5. Update navigation dropdown in all pages

### Modifying Global Styles
- Edit [css/global.css](css/global.css) - changes apply to all pages
- Use CSS custom properties (CSS variables) for theme-specific styling
- Maintain mobile-responsive breakpoints (320px, 375px, 435px, 768px, 1024px, 1440px, 2560px)

### API Integration
The subscribe endpoint is defined in [js/global.js](js/global.js):
```javascript
const SUBSCRIBE_ENDPOINT = 'https://reswap.tmithun.com:443/api/global/v1.2/public/subscribe';
```

## File Organization

```
reswap-website/
├── index.html              # Main homepage
├── fitshare.html           # FitShare community page
├── needshare.html          # NeedShare community page
├── spaceshare.html         # SpaceShare housing page
├── tripshare.html          # TripShare carpool page
├── about_us.html           # About page
├── spaceshare_partners.html # SpaceShare partners page
├── deleteMyData.html       # Data deletion request page
├── css/
│   └── global.css          # Unified CSS with theme system
├── js/
│   └── global.js           # Unified JavaScript functionality
├── images/                 # All images (centralized)
├── videos/                 # Video assets
└── about_us/               # Legacy about page assets (preserved)
```

## Deployment

The site is a static website deployed via GitHub Pages (indicated by [CNAME](CNAME) file). Any changes to HTML/CSS/JS files are immediately reflected upon deployment - no build step required.

## Responsive Design

The site uses a desktop-first responsive design approach with media queries. Key breakpoints are documented at the top of [css/global.css](css/global.css). When modifying layouts, test across all breakpoints.

## Browser Compatibility

Target modern browsers (Chrome, Firefox, Safari, Edge) with graceful degradation for older browsers. The site uses CSS Grid, Flexbox, and CSS custom properties.
