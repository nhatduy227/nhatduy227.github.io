# Remove Old Static Files

The old static HTML/CSS/JS files need to be removed from the repository root so GitHub Pages serves the Next.js build instead.

## Files to Remove:

1. `index.html` (old static HTML)
2. `css/` folder (old CSS files)
3. `js/` folder (old JavaScript files)
4. `scss/` folder (old SCSS source files)
5. `fonts/` folder (if not needed - fonts should be in public/)
6. `data/` folder (if not needed - data should be in public/data/)

## Important: Keep These

- `public/images/` - Your images for Next.js
- `public/data/` - Your resume PDF for Next.js
- `public/fonts/` - If you have custom fonts

## How to Remove:

Run these commands in your terminal:

```bash
# Remove old static files
rm index.html
rm -rf css/
rm -rf js/
rm -rf scss/
rm -rf fonts/  # Only if fonts are in public/fonts
rm -rf data/   # Only if data is in public/data

# Commit the changes
git add .
git commit -m "Remove old static files, use Next.js build"
git push origin main
```

After pushing, GitHub Actions will rebuild and deploy the Next.js version.
