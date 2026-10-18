# Operation: Make Her Smile Again 💗

A small, fully working interactive website made of plain HTML, CSS and JavaScript.
No backend, no database, no accounts, no API keys. Nothing she clicks, answers or
chooses is saved or sent anywhere.

```
apology-website/
├── index.html      ← structure (you normally never touch this)
├── content.js      ← ALL the words, photos, music: edit this one
├── style.css       ← colours and look (palette is at the top)
├── script.js       ← behaviour (you normally never touch this)
└── assets/
    ├── photos/     ← put your photos here
    ├── audio/      ← put your song / voice note here
    └── illustrations/
```

## 1. See it on your computer

Double-click `index.html`. That's it. (The fonts load from Google Fonts when you're
online; without them, the site falls back to Georgia and your system font.)

## 2. What to edit (everything is in `content.js`)

| What | Where in `content.js` |
|---|---|
| Her name or nickname (`{name}` is replaced everywhere) | `nickname` |
| How you sign off | `signature` |
| The 17 love notes: replace with real, specific things | `loveNotes` |
| Photo captions and which files are used | `photos` |
| The apology letter (one line per paragraph) | `letter` |
| Promise cards, quiz, courtroom text | `promises`, `quiz`, `court` |
| Gift message and optional extras | `gift` |
| Final screen text | `goodnight` |
| Hidden-star and heart secrets | `secretStarMessage`, `heartEasterEgg` |

Lines marked `>>> REPLACE <<<` are deliberately generic. I did not invent any memories,
dates or places, so please add the real ones yourself.

## 3. Add your photos

1. Copy your pictures into `assets/photos/`.
2. Name them `photo-01.jpg` … `photo-08.jpg` (or change the paths in `photos`).
3. Want more than eight? Copy one `{ src: ..., caption: ... }` line and add it.
   Photos around 1200 px wide are plenty. Big phone photos make the page slow.

Missing photos show a pretty "Your photo here" placeholder, so nothing looks broken.

## 4. Add a song or a voice note

- **Background music button:** put an `.mp3` in `assets/audio/`, then set
  `music: { src: "assets/audio/our-song.mp3", title: "Our song" }`.
  It never autoplays; she presses the ♪ button herself.
- **A song link in the gift box:** set `gift.extras.songUrl` (Spotify, YouTube, etc.)
  and `songTitle`.
- **Voice note in the gift box:** record on your phone, save as `.mp3`/`.m4a`, put it in
  `assets/audio/`, set `gift.extras.voiceNote`.
- **Photo and date idea in the gift box:** `gift.extras.photo` and `gift.extras.plan`.

Any extra left as `""` simply doesn't appear.

## 5. Put it online and share the link

**Netlify (easiest, about 1 minute)**
1. Go to <https://app.netlify.com/drop>.
2. Drag the whole `apology-website` folder onto the page.
3. You get a link. In *Site settings → Change site name* you can make it something
   private-looking.

**GitHub Pages**
1. Create a new repository (consider **Private repo + Pages** if your plan allows it,
   otherwise pick an unguessable repo name).
2. Upload everything inside `apology-website/` (so `index.html` is at the top level).
3. *Settings → Pages → Deploy from a branch → main → / (root) → Save.*
4. Your link will be `https://YOUR-USERNAME.github.io/REPO-NAME/`.

Note: anyone with the link can open it, and it contains a personal letter. Send the link only to her.

## 6. Test checklist (do this on your phone AND a laptop before sending)

- [ ] Envelope floats, opens, and the letter slides out. "skip intro" works.
- [ ] Hero title and bunny appear; the progress bar at the top moves as you scroll.
- [ ] YES button runs away (mouse hover on desktop, tap on phone), shows funny messages, then stops.
- [ ] You can always answer: "Let me just answer honestly…", and the keyboard (Tab → Enter) works.
- [ ] "A little bit" and "Not as upset now" show their replies.
- [ ] Courtroom: the sentence reveals.
- [ ] Love notes: random button works, every little envelope opens, hidden ✦ star found.
- [ ] Scrapbook: your real photos appear, tapping opens the lightbox, ‹ › and Esc work, "Show me another memory" works.
- [ ] Letter fades in line by line, nothing demands forgiveness; tapping the glowing heart 3 times shows the secret.
- [ ] Promise cards flip. Quiz runs through all 5 questions and shows the result.
- [ ] Gift opens, message fades in, extras (if set) work.
- [ ] Goodnight screen shows; the last button scrolls to the top.
- [ ] No sideways scrolling on the phone. Music only plays when she presses ♪.
- [ ] Read every word once more, out loud. Make sure it sounds like *you*.

## Accessibility and performance notes

- Semantic HTML, visible focus outlines, keyboard-friendly everything, readable contrast.
- Respects "Reduce motion" in the device settings: floating hearts, sparkles and
  flip/slide animations are turned off or simplified.
- No libraries, no tracking, no network requests except the optional Google Fonts.
