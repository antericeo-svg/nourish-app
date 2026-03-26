# 🌿 Nourish — AI-Powered Meal Planning

## Quick Deploy to Vercel (Step by Step)

### Step 1: Get the Code on GitHub

1. Go to **github.com** and create an account (or sign in)
2. Click the **+** button top-right → **New repository**
3. Name it `nourish-app`
4. Keep it **Public** (free hosting)
5. Click **Create repository**
6. On the next screen, click **"uploading an existing file"**
7. Drag ALL the files from this folder into the upload area
8. **IMPORTANT**: GitHub's file uploader is flat — you need to preserve the folder structure. The easiest way:
   - Option A: Use GitHub Desktop app (download from desktop.github.com) — drag the whole `nourish-app` folder in
   - Option B: Use the command line (instructions below)

### Step 1 (Alternative): Command Line Upload

If you're comfortable with the terminal:

```bash
# Install git if you haven't: https://git-scm.com/downloads
cd nourish-app
git init
git add .
git commit -m "Initial commit - Nourish meal planner"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nourish-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 2: Deploy on Vercel

1. Go to **vercel.com** and sign in
2. Click **"Add New..."** → **Project**
3. Click **"Import"** next to your `nourish-app` repository
4. Vercel will auto-detect it's a Vite project — leave all settings as default
5. Click **Deploy**
6. Wait ~60 seconds. You'll get a live URL like `nourish-app.vercel.app`

### Step 3: Add Your Anthropic API Key (for AI Advisor)

The AI Advisor feature needs a Claude API key to work. Your key stays secret on the server — users never see it.

1. In Vercel dashboard, click your project
2. Go to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: Your API key from console.anthropic.com
4. Click **Save**
5. Go to **Deployments** → click the **three dots** on the latest → **Redeploy**

Don't have an API key yet? Sign up at **console.anthropic.com**. You get free credits to start.

### Step 4: Connect Your Custom Domain

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Type your domain (e.g., `trynourish.app`) and click **Add**
3. Vercel will show you DNS records to add
4. Go to your domain registrar (Namecheap, Porkbun, etc.)
5. Add the DNS records Vercel shows you
6. Wait 5-30 minutes for DNS to propagate
7. Vercel automatically adds a free SSL certificate

### Step 5: Connect Email Capture (Beehiiv)

1. Create a free account at **beehiiv.com**
2. Create a new publication called "Nourish"
3. Go to **Grow** → **Signup Forms** → **Embedded**
4. Copy the form action URL
5. In your code, update the email form in `src/pages/Landing.jsx` to POST to that URL

---

## Project Structure

```
nourish-app/
├── api/
│   └── ai-advisor.js      ← Serverless function (keeps API key secret)
├── src/
│   ├── main.jsx            ← App entry point with routing
│   └── pages/
│       ├── Landing.jsx     ← Marketing landing page (yoursite.com/)
│       └── App.jsx         ← Meal planner app (yoursite.com/app)
├── index.html              ← HTML entry point
├── package.json            ← Dependencies
├── vite.config.js          ← Build config
├── vercel.json             ← Routing + serverless config
└── .gitignore
```

## How It Works

- **Landing page** (`/`) — Marketing page with email capture and pricing
- **App** (`/app`) — The full meal planner with AI advisor
- **API** (`/api/ai-advisor`) — Serverless function that calls Claude API securely

## Tech Stack

- **Frontend**: React 18 + Vite
- **Hosting**: Vercel (free tier)
- **AI**: Claude API via Anthropic (serverless function)
- **Storage**: localStorage (user's browser)
- **Routing**: React Router
