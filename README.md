# Down the Memory Lane - 3 Month Anniversary Website 💕

A beautiful, romantic website to celebrate your 3-month anniversary with your girlfriend!

## Features ✨

- **Landing Page**: Welcoming message with a continue button
- **Automatic Slideshow**: Photos and text slides that automatically transition
- **Background Music**: Plays for 2 minutes synchronized with the slideshow
- **Beautiful Animations**: Floating hearts, smooth transitions, and glowing effects
- **Responsive Design**: Works perfectly on mobile and desktop
- **Progress Bar**: Shows music/slideshow progress
- **Keyboard Navigation**: Use arrow keys to manually navigate slides

## How to Customize 🎨

### 1. Add Your Photos

Place your photos in the `/home/sidd/Desktop/kshir` folder with names like:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- etc.

### 2. Add Your Music

Add your music file as `music.mp3` in the same folder. Make sure it's approximately 2 minutes long for the best experience.

### 3. Customize the Slides

Open `script.js` and edit the `slides` array at the top:

```javascript
const slides = [
  {
    type: 'text',
    title: 'Your Title Here',
    content: 'Your message here...'
  },
  {
    type: 'photo',
    src: 'photo1.jpg',
    caption: 'Your caption here'
  },
  // Add more slides...
];
```

**Slide Types:**
- `text`: Display a title and message
- `photo`: Display a photo with a caption

### 4. Adjust Timing (Optional)

In `script.js`, you can adjust:
- `MUSIC_DURATION`: Total music length in milliseconds (default: 120000 = 2 minutes)
- The slides will automatically distribute evenly across the music duration

## How to Run 🚀

### Option 1: Simple File Opening
1. Double-click `index.html` to open it in your browser

### Option 2: Local Server (Recommended)
Run a local server to avoid any browser restrictions:

```bash
# If you have Python installed:
python3 -m http.server 8000

# Then open: http://localhost:8000
```

## Tips for Best Experience 💡

1. **Photo Quality**: Use high-quality photos (but not too large, keep them under 2MB each)
2. **Photo Orientation**: Mix of landscape and portrait photos works great
3. **Music Choice**: Pick a meaningful song that's close to 2 minutes
4. **Number of Slides**: 8-12 slides work best for a 2-minute experience
5. **Text Length**: Keep text messages concise and heartfelt
6. **Test First**: Preview the website before showing it to make sure everything works

## File Structure 📁

```
kshir/
├── index.html          # Main HTML file
├── index.css           # Styles and animations
├── script.js           # Slideshow logic
├── music.mp3           # Your background music (add this)
├── photo1.jpg          # Your photos (add these)
├── photo2.jpg
├── photo3.jpg
└── README.md           # This file
```

## Customization Ideas 🎨

- Change colors in `index.css` by modifying the CSS variables at the top
- Add more heart emojis in the `heartSymbols` array
- Adjust animation speeds in the CSS
- Add more slides with different memories
- Change fonts by updating the Google Fonts import

## Troubleshooting 🔧

**Music doesn't play:**
- Some browsers block autoplay. Click anywhere on the page after pressing continue
- Make sure your music file is named exactly `music.mp3`
- Try using a local server instead of opening the file directly

**Photos don't show:**
- Check that photo filenames in `script.js` match your actual files
- Make sure photos are in the same folder as `index.html`
- Check browser console (F12) for any errors

**Slides change too fast/slow:**
- Adjust the `MUSIC_DURATION` constant in `script.js`
- Or change the number of slides to match your music length

## Made with Love ❤️

Created to celebrate special moments and memories. Enjoy your anniversary! 🎉
