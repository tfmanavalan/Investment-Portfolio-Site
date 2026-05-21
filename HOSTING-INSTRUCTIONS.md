# Hosting Your Investment Portfolio Website

## For Remote Colleagues (Recommended): Use ngrok

### Step 1: Download ngrok
1. Go to https://ngrok.com/download
2. Download for Windows
3. Extract the zip file to your project folder

### Step 2: Start Your Website
1. Double-click `start-server.bat` (this starts Python server on port 8000)
2. Keep this window open

### Step 3: Start ngrok
1. Open a new Command Prompt
2. Navigate to your project folder:
   ```
   cd "C:\Users\MANAT\OneDrive - Pegasystems Inc\Documents\Thomas\Personal\Investment Portfolio"
   ```
3. Run ngrok:
   ```
   ngrok http 8000
   ```

### Step 4: Share the Link
- ngrok will show a URL like: `https://abc123.ngrok-free.app`
- Share this URL with your colleagues
- They can access it from anywhere in the world!

**Note:** 
- Free ngrok URLs expire when you close it
- You need to keep both windows open (Python server + ngrok)
- Get a new URL each time you restart ngrok

---

## Solution 2: GitHub Pages (Best for Permanent Hosting)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Investment Portfolio Website"
git branch -M main
git remote add origin https://github.com/tfmanavalan/Investment-Portfolio-Site.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repo: https://github.com/tfmanavalan/Investment-Portfolio-Site
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch
4. Click **Save**
5. Your site will be live at: `https://tfmanavalan.github.io/Investment-Portfolio-Site/`

**Benefits:**
- Free, permanent hosting
- Always accessible
- No need to keep your computer on
- Professional URL

---

## Solution 3: Free Hosting Services

### Netlify (Drag & Drop)
1. Go to https://www.netlify.com/
2. Sign up (free)
3. Drag your project folder to Netlify
4. Get instant URL like: `your-site.netlify.app`

### Vercel (Simple Deploy)
1. Go to https://vercel.com/
2. Sign up with GitHub
3. Import your repository
4. Automatic deployment

---

## Finding Your IP Address (Only works for same network)

**If colleagues were on the same office network:**

1. Open Command Prompt
2. Type: `ipconfig`
3. Look for "IPv4 Address" under your network adapter
4. Example: `192.168.1.100`

Then colleagues would visit: `http://192.168.1.100:8000`

**But this WON'T work for remote workers!**

---

## Recommended Approach for Your Situation

Since colleagues are remote:

**Quick Demo (1-2 hours):**
→ Use **ngrok** (Solution 1)

**Permanent Access:**
→ Use **GitHub Pages** (Solution 2) - Already have the repo!

**Professional Hosting:**
→ Use **Netlify** or **Vercel** (Solution 3)

---

## Quick Start Guide: ngrok

1. Download ngrok: https://ngrok.com/download
2. Extract to your project folder
3. Run `start-server.bat`
4. In new terminal: `ngrok http 8000`
5. Share the https URL with colleagues
6. Done! ✅

They can access it immediately from anywhere in the world!
