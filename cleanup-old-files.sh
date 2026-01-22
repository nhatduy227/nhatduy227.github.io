#!/bin/bash

# Script to remove old static files that conflict with Next.js build
# Run this script to clean up the repository

echo "Removing old static files..."

# Remove old static HTML file
if [ -f "index.html" ]; then
  rm index.html
  echo "✓ Removed index.html"
fi

# Remove old static asset folders (if they exist and aren't needed)
# Note: We keep public/images and public/data for Next.js

if [ -d "css" ] && [ ! -L "css" ]; then
  rm -rf css/
  echo "✓ Removed css/ folder"
fi

if [ -d "js" ] && [ ! -L "js" ]; then
  rm -rf js/
  echo "✓ Removed js/ folder"
fi

if [ -d "scss" ] && [ ! -L "scss" ]; then
  rm -rf scss/
  echo "✓ Removed scss/ folder"
fi

# Only remove fonts/ and data/ if they're not in public/
if [ -d "fonts" ] && [ ! -d "public/fonts" ]; then
  echo "⚠ fonts/ exists but public/fonts/ doesn't - keeping fonts/ for now"
elif [ -d "fonts" ] && [ -d "public/fonts" ]; then
  rm -rf fonts/
  echo "✓ Removed fonts/ folder (using public/fonts/ instead)"
fi

if [ -d "data" ] && [ ! -d "public/data" ]; then
  echo "⚠ data/ exists but public/data/ doesn't - keeping data/ for now"
elif [ -d "data" ] && [ -d "public/data" ]; then
  rm -rf data/
  echo "✓ Removed data/ folder (using public/data/ instead)"
fi

echo ""
echo "Cleanup complete! Now commit and push:"
echo "  git add ."
echo "  git commit -m 'Remove old static files, use Next.js build'"
echo "  git push origin main"
