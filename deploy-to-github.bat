@echo off
echo ========================================
echo Deploy Investment Portfolio to GitHub
echo ========================================
echo.
echo This will:
echo 1. Initialize git repository
echo 2. Add all files
echo 3. Commit changes
echo 4. Push to GitHub
echo.
echo Press any key to continue...
pause > nul
echo.

echo Step 1: Initializing git...
git init

echo.
echo Step 2: Adding files...
git add .

echo.
echo Step 3: Creating commit...
git commit -m "Initial commit: Investment Portfolio Website with interactive slideshow"

echo.
echo Step 4: Setting up remote...
git branch -M main
git remote add origin https://github.com/tfmanavalan/Investment-Portfolio-Site.git

echo.
echo Step 5: Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo SUCCESS! Code pushed to GitHub
echo ========================================
echo.
echo Next steps:
echo 1. Go to: https://github.com/tfmanavalan/Investment-Portfolio-Site
echo 2. Click Settings
echo 3. Click Pages (left sidebar)
echo 4. Under "Source", select "main" branch
echo 5. Click Save
echo 6. Wait 1-2 minutes
echo 7. Your site will be live at:
echo    https://tfmanavalan.github.io/Investment-Portfolio-Site/
echo.
pause