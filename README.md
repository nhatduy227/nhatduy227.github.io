# Nom Phan - Portfolio Website

A modern, minimalist portfolio website built with Next.js, inspired by Brittany Chiang's v4 portfolio design with a vibrant violet accent color theme.

## Features

- ✨ **Spotlight Cursor Effect** - A glowing gradient orb that follows your mouse cursor
- 🎨 **Vibrant Violet Theme** - Custom accent color (#7F00FF) throughout
- 📱 **Responsive Design** - Works beautifully on all devices
- 🎯 **Smooth Animations** - Powered by Framer Motion
- 🌙 **Dark Mode** - Beautiful dark navy background (#0a192f)
- 📍 **Active Section Highlighting** - Navigation automatically highlights the current section

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages:

1. **Push to GitHub**: Make sure your repository is named `nhatduy227.github.io` (or your username)
2. **Enable GitHub Pages**: 
   - Go to your repository Settings → Pages
   - Under "Source", select "GitHub Actions"
3. **Automatic Deployment**: Every push to the `main` branch will automatically:
   - Build the Next.js app
   - Export it as static files
   - Deploy to GitHub Pages
   - Your site will be live at `https://nhatduy227.github.io`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles the build and deployment automatically.

## Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Sidebar.tsx      # Fixed left sidebar with navigation
│   ├── SpotlightCursor.tsx  # Cursor spotlight effect
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Experience.tsx   # Work experience section
│   └── Projects.tsx     # Projects showcase
└── public/              # Static assets
```

## Customization

### Changing Colors

Edit `tailwind.config.js` to modify the color scheme:

```js
colors: {
  'accent': '#7F00FF', // Your accent color
  'navy-dark': '#0a192f', // Background
  // ... other colors
}
```

### Adding Content

- **About Section**: Edit `components/About.tsx`
- **Experience**: Edit the `experiences` array in `components/Experience.tsx`
- **Projects**: Edit the `projects` array in `components/Projects.tsx`

## Build for Production

```bash
npm run build
```

This creates an `out` folder with static files ready for deployment.

## License

Personal use only.

## Contact

Nom Phan
- Email: nomiephan1504@gmail.com
- Website: https://nhatduy227.github.io
