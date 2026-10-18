/* =====================================================================
   CONTENT.JS  —  EDIT THIS FILE TO PERSONALISE THE WEBSITE
   ---------------------------------------------------------------------
   Everything she will read lives here. You do not need to touch
   index.html, style.css or script.js for normal personalisation.

   Tips
   - Keep the quotes ("...") and commas exactly as they are.
   - Use {name} anywhere in a text and it becomes her nickname.
   - Lines marked  >>> REPLACE <<<  are generic on purpose. Swap them for
     real, specific things about her. Nothing here invents memories.
   ===================================================================== */

window.SITE = {

  /* ---------- 1. THE BASICS ---------- */
  nickname: "my love",                 // >>> REPLACE <<< her name or nickname
  signature: "your favourite idiot",   // how you sign off on the last screen

  /* ---------- 2. OPTIONAL MUSIC (never autoplays) ----------
     Put an mp3 in assets/audio/ and set src, e.g. "assets/audio/our-song.mp3".
     Leave src empty ("") to hide the music button completely. */
  music: {
    src: "",
    title: "A song that reminds me of you"
  },

  /* ---------- 3. THE "ARE YOU STILL UPSET?" QUESTION ---------- */
  dodgeLimit: 7,   // how many times the YES button runs before it stops and lets her answer
  dodgeMessages: [
    "WAIT WAIT, LET ME EXPLAIN 😭",
    "BABY, PLEASE HEAR MY CASE.",
    "MY LAWYER IS STILL PREPARING THE DEFENCE.",
    "OKAY, THAT'S FAIR. I DESERVE THAT.",
    "WHY ARE YOU SO GOOD AT THIS 😭",
    "I'M RUNNING OUT OF EXCUSES, NOT LOVE.",
    "YOUR HONOUR, MY CLIENT IS AN IDIOT.",
    "FINE, I'M GUILTY. COMPLETELY GUILTY.",
    "THE BUTTON IS SCARED OF ACCOUNTABILITY TOO 💀",
    "I CAN'T OUTRUN WHAT I DID. I'M SORRY."
  ],
  settleMessage: "Okay, okay. I'll stop running. Answer however you honestly feel. 🫡",
  answers: {
    yes: "Okay, baby. I understand. You don't have to pretend you're okay just to make me feel better. I'm still really sorry. ❤️",
    little: "That's understandable, my love. I know a cute website can't magically fix everything, but I hope it can at least make you smile a little. 🥹",
    notAsMuch: "THAT'S A LITTLE WIN! I STILL OWE YOU BETTER ACTIONS, THOUGH. COME HERE, YOU. 🫂"
  },

  /* ---------- 4. THE COURTROOM ---------- */
  court: {
    defendant: "Your favourite idiot.",
    charges: "Being an idiot when he should have been more thoughtful.",
    evidence: "His own regrettable behaviour.",
    defence: "None. He knows he messed up.",
    judge: "The girl he should have treated better.",
    verdict: "GUILTY. NO CONTEST.",
    sentence: [
      "A sincere apology.",
      "Listening without making excuses.",
      "Putting in real effort.",
      "Treating his favourite girl with the care she deserves.",
      "Proving that he can learn from his mistakes."
    ],
    footnote: "Appeals are permitted only through consistent good behaviour."
  },

  /* ---------- 5. THINGS I LOVE ABOUT YOU (at least 15) ----------
     >>> REPLACE <<< as many as you can with real, specific things about her.
     Add or delete lines freely; the envelopes update themselves. */
  loveNotes: [
    "Your smile has a way of making ordinary moments feel special.",
    "I love how you have your own way of looking at the world.",
    "You make little moments worth remembering.",
    "I love your personality, including the parts that make you completely impossible sometimes. 😂",
    "You deserve kindness, even when we're upset with each other.",
    "You are your own person, with your own feelings, dreams, and boundaries. I love that about you.",
    "I love the little things about you that you probably don't even notice.",
    "You don't have to be happy all the time to be loved.",
    "You matter to me on your best days and your difficult days.",
    "You're not just someone I love. You're someone I want to keep learning how to love better.",
    "Your feelings are valid, even when I don't get it right away.",   // >>> REPLACE <<<
    "You make me want to be more thoughtful.",                         // >>> REPLACE <<<
    "I'm grateful for every day I get to know you better.",            // >>> REPLACE <<<
    "You deserve to be celebrated, not just on birthdays.",            // >>> REPLACE <<<
    "The way you care about people is one of my favourite things about you.", // >>> REPLACE <<<
    "I love that you can make me laugh even when I'm trying to be serious.",  // >>> REPLACE <<<
    "You are enough exactly as you are."                               // >>> REPLACE <<<
  ],
  secretStarMessage: "Psst... you're still my favourite notification. ❤️",

  /* ---------- 6. PHOTO SCRAPBOOK (at least 8) ----------
     Drop your photos into assets/photos/ using these file names, or edit the paths.
     size: "large" (featured) or "small". If a file is missing, a pretty
     placeholder is shown instead, so nothing ever looks broken.
     >>> REPLACE <<< the captions with real ones (no dates/places are invented). */
  photos: [
    { src: "assets/photos/photo-01.jpg", caption: "One of my favourite little memories.", size: "large" },
    { src: "assets/photos/photo-02.jpg", caption: "A moment I'd happily live again.",     size: "small" },
    { src: "assets/photos/photo-03.jpg", caption: "Proof that ordinary days can become special.", size: "small" },
    { src: "assets/photos/photo-04.jpg", caption: "You, being effortlessly you.",         size: "small" },
    { src: "assets/photos/photo-05.jpg", caption: "A memory that still makes me smile.",  size: "large" },
    { src: "assets/photos/photo-06.jpg", caption: "More little moments, please.",         size: "small" },
    { src: "assets/photos/photo-07.jpg", caption: "Us, in a frame.",                      size: "small" },
    { src: "assets/photos/photo-08.jpg", caption: "A little moment I want to keep.",      size: "small" }
  ],

  /* ---------- 7. THE APOLOGY LETTER ----------
     One string per paragraph. Edit freely. {name} works here too. */
  letter: [
    "Hey, baby. ❤️",
    "I've been thinking about what happened, and I genuinely regret the way I behaved.",
    "I hurt you, and I'm especially sorry that my actions affected a time when you deserved to feel happy, loved, and appreciated. You didn't deserve to be left feeling upset because of me.",
    "I know that making this website, writing a letter, or saying 'I'm sorry' cannot magically undo what happened. I'm not expecting a cute animation or a few romantic words to make everything okay.",
    "I just wanted to make an effort because you matter to me.",
    "I'm sorry for my decisions, for the way I acted, and for the feelings I caused you. I want to understand how it affected you rather than defend myself or make excuses.",
    "You don't have to rush to forgive me. You don't have to pretend you're okay for my sake, either.",
    "I want to learn from this and show you through my actions that I can handle things better, communicate better, and treat your feelings with the care and respect they deserve.",
    "I love you, and I don't want my love to be something you only hear in words. I want you to feel it in the way I treat you, especially when things aren't perfect between us.",
    "You deserved better from me, baby. I'm truly sorry.",
    "Whenever you're ready, I'd love to listen, make things right where I can, and create happier memories with you.",
    "I love you. ❤️"
  ],
  letterNote: "This letter isn't a request for instant forgiveness. It's simply something I wanted you to know.",
  heartEasterEgg: "Congratulations. You have discovered that your boyfriend is, in fact, hopelessly in love with you. 😭❤️",

  /* ---------- 8. PROMISE CARDS ---------- */
  promises: [
    { icon: "👂", title: "LISTEN BETTER",
      text: "Your feelings deserve to be heard, not dismissed. I want to listen without immediately defending myself." },
    { icon: "🌷", title: "THINK BEFORE I ACT",
      text: "I want to be more thoughtful about my decisions and how they affect you." },
    { icon: "🤝", title: "SHOW UP CONSISTENTLY",
      text: "I want my actions to match my words, not just when things are going well." },
    { icon: "🌱", title: "KEEP LEARNING",
      text: "I won't promise to be perfect. I will promise to take responsibility, learn from mistakes, and genuinely try to do better." }
  ],

  /* ---------- 9. THE LITTLE QUIZ (nothing is scored, saved or sent) ---------- */
  quiz: [
    { q: "Who is more dramatic?", options: [
      { text: "Obviously you.", reply: "Dramatic? Maybe. Iconic? Definitely. 😌" },
      { text: "Obviously me.", reply: "Fair. I've been very dramatic about this whole apology. 😭" },
      { text: "We're both a public safety concern.", reply: "A public safety concern, but a cute one. 🚨" } ] },
    { q: "Who deserves extra affection?", options: [
      { text: "You.", reply: "Correct. Extra affection granted. 🤍" },
      { text: "Also you.", reply: "Wow, you read my mind. Still you. 🥹" },
      { text: "You, again.", reply: "Okay, we've established it. You. Always you. 💗" } ] },
    { q: "What is the boyfriend's current status?", options: [
      { text: "Under investigation.", reply: "Investigation closed: I messed up, and I know it. 🕵️" },
      { text: "Officially guilty.", reply: "Guilty, and taking it seriously. ⚖️" },
      { text: "On probation for being an idiot.", reply: "Probation accepted. Good behaviour required. 📋" } ] },
    { q: "What's the most important relationship skill?", options: [
      { text: "Actually listening.", reply: "A big one. I'm working on it. 👂" },
      { text: "Communicating honestly.", reply: "Yes. Even when it's uncomfortable. 💬" },
      { text: "Showing love through actions.", reply: "Words are easy. Actions are the real test. 🌷" },
      { text: "All of the above.", reply: "Correct. Annoyingly correct. And I'm working on all of it. 🌱" } ] },
    { q: "What should happen next?", options: [
      { text: "A little laugh.", reply: "A laugh is already a win. 😄" },
      { text: "A peaceful conversation when we're ready.", reply: "Whenever you're ready. No rush, no pressure. 🕊️" },
      { text: "More happy memories in the future.", reply: "I'd like that. Slowly, at your pace. 🌙" } ] }
  ],
  quizResult: {
    title: "Result: you're allowed to feel exactly how you feel.",
    text: "There were no wrong answers, nothing was scored, and nothing here was saved or sent anywhere. Take all the time you need. 🤍"
  },

  /* ---------- 10. THE GIFT BOX ---------- */
  gift: {
    message: [
      "If I could give you one thing right now, it would be the feeling of knowing how loved, appreciated, and special you are.",
      "You deserve to have beautiful birthdays, peaceful days, silly laughs, and people who make you feel safe to be yourself.",
      "I can't change the way I handled things, but I can take responsibility for what comes next.",
      "Here's to more laughter, more understanding, and better memories — whenever you're ready. ❤️"
    ],
    /* Optional extras. Leave a value as "" and that extra simply won't appear. */
    extras: {
      songTitle: "",   // e.g. "Our song"
      songUrl: "",     // e.g. a Spotify / YouTube link (she chooses whether to click it)
      photo: "",       // e.g. "assets/photos/gift.jpg"
      photoCaption: "",
      plan: "",        // e.g. "Whenever you feel like it: dinner at your favourite place, my treat."
      voiceNote: ""    // e.g. "assets/audio/voice-note.mp3"  (she presses play herself)
    }
  },

  /* ---------- 11. THE GOODNIGHT SCREEN ---------- */
  goodnight: {
    line1: "Whatever you're feeling right now, you don't have to hide it from me.",
    line2: "I hope this little corner of the internet made you smile, even for a second.",
    line3: "Made with love, a little regret, a lot of affection, and the hope of doing better. ❤️",
    signoff: "Always rooting for your happiness,"
  }
};
