# Operation Birthday 🎂

A client-side React + Vite birthday adventure for Dineth.

## 1. Install and run

```bash
npm install
npm run dev
```

## 2. Personalize it

Edit `src/data/config.js`:
- Replace the four candidate placeholders.
- The password clue is the supplied image; add it as `public/assets/password-clue.jpg`. The clue text and progressive hints are pre-filled in `src/data/config.js`. Set the accepted 16-character password after reading the image.
- Paste the Google Drive gift URL.
- Change any displayed wording if desired.

Add your own images to `public/assets/` using these exact filenames:
- `password-clue.jpg`
- `transparent-spectacles.png`
- `scientific-calculator.png`
- `ampara-ticket-01.png`
- `ampara-ticket-02.png`
- optional `birthday-background.jpg`
- optional `birthday-music.mp3`

Missing images have friendly fallback UI; the application still works.

## 3. Build

```bash
npm run build
npm run preview
```

## 4. Publish with GitHub + Vercel

1. Create an empty GitHub repository.
2. In this project folder run:

   ```bash
   git init
   git add .
   git commit -m "Create Operation Birthday"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/operation-birthday.git
   git push -u origin main
   ```

3. Sign in to Vercel and choose **Add New → Project**.
4. Import the GitHub repository.
5. Framework preset: **Vite**. Build command: `npm run build`; output directory: `dist`.
6. Click **Deploy** and wait for the deployment to finish.
7. Open the generated HTTPS URL on desktop and mobile and test the full journey.

## Important privacy/security note

This is a playful birthday game, not real authentication. The password and five answers are shipped to the browser in JavaScript and can be inspected by anyone who knows how. Do not use real secrets or sensitive personal information. The supplied security answers from the brief are kept in the client-side config as requested. A real access-control system would require a backend.

## Music

Browsers block autoplay in many cases. Music starts only after the visitor presses the music control. Add `birthday-music.mp3` to `public/assets/`.


## Music autoplay
- The app now attempts to start the background music automatically when the page loads.
- Browsers may block audible autoplay until the visitor interacts with the page. If blocked, use the MUSIC OFF / MUSIC ON control once; playback will then loop.

- Added the newly supplied childhood photo as the eighth tile in the 4-by-2 background photo grid.
