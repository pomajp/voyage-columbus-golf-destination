# The Voyage - Interactive Pitch Deck

## 🚀 Quick Start

### Option 1: Python (Simplest - No Installation Required)
```bash
cd voyage-pitch
python3 -m http.server 8080
```
Then open http://localhost:8080 in your browser

### Option 2: Node.js/Express
```bash
cd voyage-pitch
npm install
npm start
```
Then open http://localhost:8080 in your browser

### Option 3: Direct File Opening
Simply open `index.html` in your browser (some features may be limited)

## 📱 Viewing on Mobile/Tablet
1. Find your computer's IP address:
   - Mac: `ifconfig | grep inet`
   - Windows: `ipconfig`
2. Start the server using Option 1 or 2
3. On your mobile device, go to: `http://[YOUR_IP]:8080`

## ☁️ Deploying to the Cloud

### Google Cloud Run (Recommended)
1. Install Google Cloud SDK
2. Create a Dockerfile:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
```
3. Deploy:
```bash
gcloud run deploy voyage-pitch --source . --allow-unauthenticated
```

### Vercel (Simplest)
```bash
npx vercel
```

### Netlify
1. Drag and drop the `voyage-pitch` folder to netlify.com
2. Your site will be live instantly!

## 🎯 Features

- **Interactive Course Builder**: Click on courses to see different combinations
- **Smooth Scrolling**: Professional navigation experience
- **Animated Statistics**: Numbers animate when scrolled into view
- **Mobile Responsive**: Looks great on all devices
- **Modern Design**: Gradient backgrounds, parallax effects, and smooth animations

## 💡 Customization

### Adding Your Images
Replace the placeholder images in `index.html`:
- Look for `https://images.unsplash.com/...` URLs
- Replace with your actual course/concept images

### Updating Content
All content is in `index.html` - simply edit the text directly

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-green: #2d5016;
    --accent-green: #4a7c2e;
    --gold: #ffb700;
    /* etc... */
}
```

## 📊 Pitch Deck Highlights

- **The Opportunity**: Columbus market data and timing
- **Three Courses**: Mix & match flexibility (3-18 holes)
- **Hospitality Revolution**: FORE caddies, Shak Bars, music
- **The Mountains**: Punchbowl putting complex
- **Youth Development**: First Tee partnership, Passport program
- **Financial Projections**: $12-15M Year 3 revenue potential
- **Partnership Structure**: Win-win-win collaboration model

## 🎨 Design Credits

- **Fonts**: Google Fonts (Inter + Playfair Display)
- **Animations**: AOS (Animate On Scroll)
- **Charts**: Chart.js
- **Icons**: Native emojis for universal support

## 📞 Support

For questions or modifications, this deck was created with AI assistance via Cursor.
The vision and content come from Dan Culp and the ForeTwo team.

---

*"Let's embark on this voyage together."*
