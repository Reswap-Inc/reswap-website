# ReSwap Website - Unified Structure

## Overview
This is the unified ReSwap website that combines the homepage, FitShare, and NeedShare communities into one cohesive experience.

## File Structure
```
reswap-website/
├── index.html              # Main homepage
├── fitshare.html           # FitShare community page
├── needshare.html          # NeedShare community page
├── spaceshare.html         # SpaceShare housing page
├── css/
│   └── global.css          # Unified CSS with theme system
├── js/
│   └── global.js           # Unified JavaScript functionality
├── images/                 # All images from all communities
│   ├── [homepage images]
│   ├── [fitshare images]
│   └── [needshare images]
├── homepage/               # Original homepage folder (preserved)
├── fitshare/               # Original fitshare folder (preserved)
└── needshare/              # Original needshare folder (preserved)
```

## Features
- **Unified Theme System**: CSS variables that change based on community
- **Responsive Navigation**: Seamless navigation between communities
- **Theme-based Styling**: 
  - Homepage: Green theme (#31a050)
  - FitShare: Teal theme (#008a73)
  - NeedShare: Red theme (#df3f42)
  - SpaceShare: Blue theme (#50A6CA)
- **Interactive Elements**: FAQ toggles, smooth scrolling, form handling
- **Mobile Responsive**: Works on all device sizes

## How to Use
1. Open `index.html` in a web browser to view the main homepage
2. Navigate to communities using the navigation menu or community cards
3. Each community maintains its unique branding while sharing common components

## Navigation Structure
- **Homepage** (`index.html`): Main landing page with overview of all communities
- **FitShare** (`fitshare.html`): Fitness equipment and fashion sharing community
- **NeedShare** (`needshare.html`): Essential items and daily necessities community
- **Future Communities**: Placeholders for Carpool community

## Technical Details
- **CSS**: Uses CSS custom properties for theme switching
- **JavaScript**: Modular approach with theme management, FAQ handling, smooth scrolling
- **Images**: Centralized in `/images/` folder for easier management
- **Fonts**: Google Fonts (Frank Ruhl Libre, Inter)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Graceful degradation for older browsers

## Development Notes
- Original folder structure is preserved for reference
- New unified structure allows for easier maintenance and consistent user experience
- Theme system can be easily extended for additional communities
