# 🚀 DEPLOYMENT GUIDE - Get The Voyage Live in 5 Minutes!

## Option 1: GitHub Pages (RECOMMENDED - Free & Professional)
**Time: 5 minutes** | **Cost: FREE** | **URL: yourusername.github.io/voyage-pitch**

### Steps:
1. Go to https://github.com/new
2. Create a new repository called `voyage-pitch` (or any name you want)
3. Keep it PUBLIC (for free hosting)
4. Don't initialize with README (we already have one)
5. Run these commands in your terminal:

```bash
cd /Users/jonathanpoma/Desktop/ForeTwo/voyage-pitch

# Add your GitHub repository as origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/voyage-pitch.git

# Push to GitHub
git branch -M main
git push -u origin main

# Create gh-pages branch for hosting
git checkout -b gh-pages
git push origin gh-pages
```

6. Go to your repo on GitHub → Settings → Pages
7. Source: Deploy from branch → gh-pages → / (root)
8. Click Save
9. Your site will be live at: `https://YOUR_USERNAME.github.io/voyage-pitch/`

### To Update Later:
```bash
git add .
git commit -m "Update pitch deck"
git push origin gh-pages
```

---

## Option 2: Vercel (INSTANT - Even Easier!)
**Time: 2 minutes** | **Cost: FREE** | **URL: voyage-pitch.vercel.app**

### Steps:
1. Install Vercel CLI (one time only):
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd /Users/jonathanpoma/Desktop/ForeTwo/voyage-pitch
vercel
```

3. Follow prompts:
   - Login/Sign up (use GitHub)
   - Set up and deploy? Y
   - Which scope? (select your account)
   - Link to existing project? N
   - What's your project name? voyage-pitch
   - In which directory? ./ (current)
   - Override settings? N

4. DONE! You'll get a URL like: `https://voyage-pitch.vercel.app`

### To Update Later:
```bash
vercel --prod
```

---

## Option 3: Netlify (DRAG & DROP!)
**Time: 30 seconds** | **Cost: FREE** | **URL: voyage-pitch.netlify.app**

### Steps:
1. Go to https://app.netlify.com/drop
2. Drag your entire `voyage-pitch` folder onto the page
3. DONE! Instant URL!
4. (Optional) Create free account to keep it permanent

---

## Option 4: Google Cloud Run (Professional but Complex)
**Time: 15 minutes** | **Cost: ~$5/month** | **URL: Custom domain possible**

### Steps:
1. Create Dockerfile:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json server.js ./
COPY index.html styles.css script.js ./
RUN npm install --production
EXPOSE 8080
CMD ["node", "server.js"]
```

2. Deploy:
```bash
gcloud run deploy voyage-pitch \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

---

## 🎯 QUICK RECOMMENDATION:

For sharing with John McConnell THIS WEEK, use **Vercel or Netlify**:
- Professional URLs
- Zero configuration
- Instant deployment
- Free forever
- Analytics included

### Vercel One-Liner:
```bash
cd /Users/jonathanpoma/Desktop/ForeTwo/voyage-pitch && npx vercel --yes
```

This will give you a URL in literally 30 seconds!

---

## 📱 Custom Domain (Optional)

Want `thevoyagecolumbus.com`? 

1. Buy domain ($12/year on Google Domains or Namecheap)
2. Point it to your Vercel/Netlify site (they provide instructions)
3. Professional URL in 10 minutes!

---

## 🔐 Password Protection (If Needed)

For Vercel (free tier includes password protection):
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "WWW-Authenticate",
          "value": "Basic"
        }
      ]
    }
  ]
}
```

---

## SHARE THE LINK!

Once deployed, you can:
- Email the link directly
- Text it to John
- Include in meeting invites
- Add QR code to printed materials
- Share on LinkedIn (if public)

The interactive nature will blow them away compared to a PDF!
