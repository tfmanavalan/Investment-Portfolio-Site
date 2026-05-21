# Deploy to GitHub Pages - Step by Step

## ✅ Your Website is GitHub Pages Compatible!

Everything will work:
- ✅ All 12 interactive slides
- ✅ Flip cards, sliders, calculators
- ✅ Charts and animations
- ✅ Personal investment calculator
- ✅ No setup or configuration needed

---

## Method 1: Automatic Script (Easiest)

1. **Open Git Bash** in your project folder
2. **Run**: Double-click `deploy-to-github.bat`
3. Follow the on-screen instructions

---

## Method 2: Manual Commands

Open **Git Bash** or **Command Prompt** in your project folder and run:

```bash
# Step 1: Initialize repository
git init

# Step 2: Add all files
git add .

# Step 3: Commit
git commit -m "Investment Portfolio Website"

# Step 4: Connect to GitHub
git branch -M main
git remote add origin https://github.com/tfmanavalan/Investment-Portfolio-Site.git

# Step 5: Push
git push -u origin main
```

---

## Enable GitHub Pages

After pushing to GitHub:

1. Go to: https://github.com/tfmanavalan/Investment-Portfolio-Site
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under **"Source"**:
   - Select **"Deploy from a branch"**
   - Choose **main** branch
   - Folder: **/ (root)**
5. Click **Save**

**Wait 1-2 minutes** for deployment

---

## Your Live Website URL

```
https://tfmanavalan.github.io/Investment-Portfolio-Site/
```

Share this with your colleagues! ✨

---

## Benefits of GitHub Pages

✅ **Free forever**
✅ **No server maintenance**
✅ **Automatic SSL (https)**
✅ **Fast global CDN**
✅ **Always online** (no need to keep computer on)
✅ **Professional URL**
✅ **Easy updates** (just push new commits)

---

## Updating Your Website Later

When you make changes:

```bash
git add .
git commit -m "Updated calculator feature"
git push
```

GitHub Pages will automatically update (takes 1-2 minutes)

---

## Troubleshooting

### If you get "remote already exists" error:
```bash
git remote remove origin
git remote add origin https://github.com/tfmanavalan/Investment-Portfolio-Site.git
git push -u origin main
```

### If you need to force push (use carefully):
```bash
git push -u origin main --force
```

### Check if it's deployed:
- Go to repo → Actions tab
- Look for green checkmark on "pages build and deployment"

---

## Testing Before Deploying

Test locally first:
1. Run `start-server.bat`
2. Open http://localhost:8000
3. Check all slides work
4. Then deploy to GitHub!

---

## Need Help?

Check deployment status: https://github.com/tfmanavalan/Investment-Portfolio-Site/deployments

GitHub Pages docs: https://docs.github.com/en/pages
