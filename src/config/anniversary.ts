export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  locationTag: string;
  dateTag: string;
}

export interface VideoMemory {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  dateTag: string;
}

export interface AnniversaryConfig {
  wifeName: string;
  wifeTitle: string;
  husbandTitle: string;
  anniversaryDate: string; // October 14, 2026
  weddingDate: string; // 2026-06-14 (4 months prior)
  monthsCount: number;
  
  opening: {
    greeting: string;
    subgreeting: string;
    warning: string;
    buttonText: string;
  };

  hero: {
    heading: string;
    subheading: string;
    badgeDate: string;
    milestoneNumber: string;
    milestoneLabel: string;
    stats: {
      daysLabel: string;
      hoursLabel: string;
      smilesLabel: string;
      heartbeatsLabel: string;
    };
  };

  letter: {
    heading: string;
    salutation: string;
    body: string[];
    signOff: string;
    sender: string;
    ps: string;
    oneMoreThingButton: string;
    oneMoreThingSecret: {
      title: string;
      message: string;
      sticker: string;
    };
  };

  teasing: {
    title: string;
    subtitle: string;
    rules: {
      number: string;
      quote: string;
      emoji: string;
      tag: string;
    }[];
    exposeButton: string;
    confessions: {
      confession: string;
      emoji: string;
      husbandComment: string;
    }[];
  };

  gallery: {
    title: string;
    subtitle: string;
    photos: GalleryPhoto[];
  };

  videos: {
    title: string;
    subtitle: string;
    items: VideoMemory[];
  };

  reasons: {
    title: string;
    subtitle: string;
    foundations: {
      id: number;
      title: string;
      description: string;
      emoji: string;
      gradient: string;
    }[];
    interactiveButton: string;
    secretReasons: string[];
  };

  quiz: {
    title: string;
    subtitle: string;
    questions: {
      id: number;
      question: string;
      options: {
        text: string;
        reaction: string;
        emoji: string;
        husbandBanter: string;
      }[];
    }[];
  };

  quotes: {
    title: string;
    subtitle: string;
    list: {
      quote: string;
      author: string;
      tag: string;
    }[];
  };

  surprise: {
    heading: string;
    subtext: string;
    buttonText: string;
    revealQuote: string;
    revealCelebration: string;
    revealPromise: string;
    revealTease: string;
  };

  finalFeedback: {
    question: string;
    options: {
      id: string;
      label: string;
      reactionTitle: string;
      reactionMessage: string;
      emoji: string;
    }[];
  };
}

export const anniversaryConfig: AnniversaryConfig = {
  wifeName: "Noor",
  wifeTitle: "My Beautiful Wife, Noor",
  husbandTitle: "Your Husband",
  anniversaryDate: "October 14, 2026",
  weddingDate: "2026-06-14",
  monthsCount: 4,

  opening: {
    greeting: "Hey, My Beautiful Wife Noor ❤️",
    subgreeting: "Someone has a little surprise for you...",
    warning:
      "Warning: Opening this website may cause excessive smiling, blushing, butterflies, and an uncontrollable urge to hug your husband. 😌❤️",
    buttonText: "Open Your Surprise 💌",
  },

  hero: {
    heading: "4 Months of Being Yours ❤️",
    subheading:
      "Four months of marriage, a thousand little moments, countless smiles, a little bit of drama, and one love story that I want to keep writing with you forever.",
    badgeDate: "October 14, 2026",
    milestoneNumber: "4 Months",
    milestoneLabel: "Of Endless Love & Laughs",
    stats: {
      daysLabel: "Days of Marriage",
      hoursLabel: "Hours of Happiness",
      smilesLabel: "Stolen Hugs & Kisses",
      heartbeatsLabel: "Heartbeats For You",
    },
  },

  letter: {
    heading: "To My Favorite Person in the Entire Universe ❤️",
    salutation: "My dearest Noor,",
    body: [
      "Happy four months of us.",
      "It feels so genuinely special to call you my wife every single morning. These four months have given me so many reasons to smile, so many sweet little memories to treasure, and so many more reasons to fall in love with you all over again.",
      "You are my favorite person to annoy, my favorite person to tease, my favorite person to laugh with until our stomachs hurt, and the only person I want beside me through all of life's beautiful and difficult moments.",
      "I may not always express everything perfectly in words, and I might tease you a little more than strictly necessary 😏, but please never doubt how precious, irreplaceable, and deeply cherished you are to me.",
      "If I had to choose all over again across a hundred lifetimes, I would still choose you every single time — your radiant smile, your adorable madness, your cuteness, your little dramas, and everything that makes you uniquely YOU.",
      "Four months down, forever to go.",
    ],
    signOff: "Happy four-month anniversary, my beautiful wife. I love you more than these words can ever explain. ❤️",
    sender: "Forever Your Husband 💍",
    ps: "P.S. Yes, you look extraordinarily cute right now reading this.",
    oneMoreThingButton: "Read One More Thing 💗",
    oneMoreThingSecret: {
      title: "A Little Secret From My Heart 💌",
      message:
        "Every time you smile at me without even realizing it, my heart does that exact same little flutter it did the very first time I saw you. Marrying you is the best decision I will ever make in my life. You are my forever home.",
      sticker: "💍✨❤️",
    },
  },

  teasing: {
    title: "Things I Have Officially Learned After 4 Months of Marriage 😂❤️",
    subtitle:
      "A completely objective, highly scientific study conducted by a very handsome researcher.",
    rules: [
      {
        number: "Rule #1",
        quote: "My wife is always right. And when she's not right, please refer to Rule Number One. 😌",
        emoji: "👑",
        tag: "Golden Rule of Survival",
      },
      {
        number: "Rule #2",
        quote: "I thought marriage meant sharing everything. Apparently, that includes my food. Especially when she specifically says, 'I'm not hungry.' 😂🍟",
        emoji: "🍕",
        tag: "The Fry Tax Law",
      },
      {
        number: "Rule #3",
        quote: "Her smile can fix my entire day. Her one look can also make me reconsider every decision I've ever made in my life. 😭❤️",
        emoji: "👀",
        tag: "Maximum Superpower",
      },
      {
        number: "Rule #4",
        quote: "I married a princess. The kingdom's annual shopping & snack budget is still under ongoing investigation. 👑💳",
        emoji: "🛍️",
        tag: "Treasury Dept. Alert",
      },
      {
        number: "Rule #5",
        quote: "My favorite hobby is annoying my wife until she laughs… and then poking her two minutes later because I miss her attention. 🤭",
        emoji: "🧸",
        tag: "Husband Daily Schedule",
      },
      {
        number: "Rule #6",
        quote: "Official husband report: 100% in love, 200% obsessed, and permanently unavailable because my wife needs me. ❤️",
        emoji: "📋",
        tag: "Official Status: Taken Forever",
      },
    ],
    exposeButton: "Expose My Husband 😂",
    confessions: [
      {
        confession: "Yes, I sometimes annoy you on purpose. Your pout and dramatic reactions are literally the cutest thing on this earth. 😏",
        emoji: "🤭",
        husbandComment: "Guilty as charged. Zero regrets.",
      },
      {
        confession: "I pretend to look all innocent and surprised when you catch me, but we both know the absolute truth. 😇",
        emoji: "👼",
        husbandComment: "It's called tactical charm.",
      },
      {
        confession: "I will shamelessly steal your attention, your warm hugs, your hoodies, and occasionally your midnight snacks.",
        emoji: "🍫",
        husbandComment: "It's community property now, madam.",
      },
      {
        confession: "You are my favorite phone notification, even when you're the exact reason I can't concentrate on anything else all day.",
        emoji: "💌",
        husbandComment: "My focus belongs to you anyway.",
      },
    ],
  },

  gallery: {
    title: "Our Little World ❤️",
    subtitle:
      "Genuine moments, stolen smiles, and the person who makes every single second unforgettable.",
    photos: [
      {
        id: "real-photo-3",
        src: "/media/photos/photo-3.jpg",
        caption: "The shy, adorable blush I fall in love with over and over again. 💜",
        locationTag: "My Shy Princess",
        dateTag: "Stolen Blush",
      },
      {
        id: "real-photo-7",
        src: "/media/photos/photo-7.jpg",
        caption: "The smile that fixes my entire world in a heartbeat. ✨",
        locationTag: "Pure Sunshine",
        dateTag: "My Favorite View",
      },
      {
        id: "real-photo-1",
        src: "/media/photos/photo-1.jpg",
        caption: "Your pure, caring heart that makes everyone around you so happy. 🌸",
        locationTag: "Gentle Soul",
        dateTag: "Sweetest Moments",
      },
      {
        id: "real-photo-6",
        src: "/media/photos/photo-6.jpg",
        caption: "Walking through life with my beautiful queen by my side. 👑",
        locationTag: "In Full Bloom",
        dateTag: "Our Adventures",
      },
      {
        id: "real-photo-2",
        src: "/media/photos/photo-2.jpg",
        caption: "Peace, warmth, and the prettiest eyes in the entire universe. 💜",
        locationTag: "Peace & Love",
        dateTag: "Just Us",
      },
      {
        id: "real-photo-5",
        src: "/media/photos/photo-5.jpg",
        caption: "With you, even the cloudy mountains look like paradise. ☁️",
        locationTag: "Top of the World",
        dateTag: "Breathtaking",
      },
      {
        id: "real-photo-4",
        src: "/media/photos/photo-4.jpg",
        caption: "Recorded forever in my heart: that irresistible smile. 🎥",
        locationTag: "On Camera",
        dateTag: "Frame by Frame",
      },
      {
        id: "real-photo-8",
        src: "/media/photos/photo-8.jpg",
        caption: "Us. Always us. My favorite notification, my forever home. ❤️",
        locationTag: "Forever & Always",
        dateTag: "October 14, 2026",
      },
    ],
  },

  videos: {
    title: "Moments in Motion 🎬❤️",
    subtitle:
      "Because photos capture the smile, but these little videos capture your laughter, your charm, and your adorable madness.",
    items: [
      {
        id: "vid-1",
        src: "/media/videos/video-1.mp4",
        title: "A Little Laugh, A Lifetime of Joy ✨",
        caption: "That spontaneous laugh that makes my entire day 100x better.",
        tag: "Pure Joy",
        dateTag: "Sweet Memory",
      },
      {
        id: "vid-2",
        src: "/media/videos/video-2.mp4",
        title: "Caught You Smiling 😏❤️",
        caption: "Every time my camera turns toward you, magic happens.",
        tag: "Irresistible",
        dateTag: "Candids of You",
      },
      {
        id: "vid-3",
        src: "/media/videos/video-3.mp4",
        title: "My Favorite Trouble 🤭",
        caption: "The queen of cuteness and drama in action.",
        tag: "Sweet Drama",
        dateTag: "Husband Perspective",
      },
      {
        id: "vid-4",
        src: "/media/videos/video-4.mp4",
        title: "Sweet & Spontaneous 🌸",
        caption: "Little moments that turn into forever memories.",
        tag: "Cherished",
        dateTag: "Our Journey",
      },
      {
        id: "vid-5",
        src: "/media/videos/video-5.mp4",
        title: "The Cutest Reaction Ever 🥹",
        caption: "Why annoying you is officially my full-time profession.",
        tag: "Priceless",
        dateTag: "Daily Happiness",
      },
      {
        id: "vid-6",
        src: "/media/videos/video-6.mp4",
        title: "Forever My Partner in Crime 💍",
        caption: "Four months of being yours, and I want a lifetime more.",
        tag: "Forever Yours",
        dateTag: "October 14, 2026",
      },
    ],
  },

  reasons: {
    title: "Four Months, Countless Reasons",
    subtitle:
      "Why I fall a little deeper in love with you with every sunrise.",
    foundations: [
      {
        id: 1,
        title: "Your Smile",
        description: "Because it lights up every room and makes the most ordinary, mundane moments feel like pure magic.",
        emoji: "✨",
        gradient: "from-rose-500/20 to-pink-600/30",
      },
      {
        id: 2,
        title: "Your Heart",
        description: "Because the kindness, warmth, and gentle soul you carry inside matter far more than any words can explain.",
        emoji: "💖",
        gradient: "from-red-500/20 to-rose-600/30",
      },
      {
        id: 3,
        title: "Your Madness",
        description: "Because life with you is spontaneous, hilarious, and never boring for even a single second. 😂",
        emoji: "🤪",
        gradient: "from-amber-500/20 to-pink-500/30",
      },
      {
        id: 4,
        title: "Your Love",
        description: "Because being loved by you is the greatest privilege of my life, and something I will never take for granted.",
        emoji: "💍",
        gradient: "from-purple-500/20 to-rose-500/30",
      },
    ],
    interactiveButton: "Want to know another reason? Tap here ❤️",
    secretReasons: [
      "The adorable way your eyes crinkle when you laugh genuinely from your belly.",
      "How safe and peaceful the world feels whenever your head rests on my shoulder.",
      "The cute face you make when you're trying to win an argument you know you're losing.",
      "How you make our home feel like the coziest, warmest sanctuary in the world.",
      "The random songs you invent and sing while doing something completely everyday.",
      "Your comforting warm hugs that somehow erase every ounce of stress from a long day.",
      "The way you care about the little details and remember things that matter to me.",
      "How gorgeous you look first thing in the morning with messy hair and sleepy eyes.",
      "Because you are my best friend, my greatest cheerleader, and my sweet trouble all in one.",
      "The way you steal my jackets and look a hundred times better wearing them than I ever could.",
      "How you laugh at my dumbest jokes even when nobody else finds them funny.",
      "Because when I think of my future, I literally cannot imagine any version of it without you.",
      "The way you look at me across a crowded room and suddenly make everyone else disappear.",
      "Because simply having you as my wife is the greatest blessing I will ever thank God for.",
    ],
  },

  quiz: {
    title: "How Well Do You Know Your Husband? 😏💕",
    subtitle:
      "A completely fair, 100% unbiased quiz designed for my gorgeous wife.",
    questions: [
      {
        id: 1,
        question: "Who fell in love with whom first?",
        options: [
          {
            text: "He did! (He was completely head over heels)",
            reaction: "100% Correct! I fell so hard I forgot my own name.",
            emoji: "💘",
            husbandBanter: "I didn't stand a single chance. One look and I was a goner.",
          },
          {
            text: "I did! (I made the clever first move)",
            reaction: "A bold claim! But let's be honest, I was already smitten.",
            emoji: "😏",
            husbandBanter: "You might have noticed, but my heart had already surrendered.",
          },
          {
            text: "It was mutual at first sight ✨",
            reaction: "True romantic answer! The universe definitely set us up.",
            emoji: "💫",
            husbandBanter: "Two souls who recognized each other immediately.",
          },
        ],
      },
      {
        id: 2,
        question: "Who is officially more likely to annoy the other person?",
        options: [
          {
            text: "Him! (He is a professional full-time pest)",
            reaction: "Look, annoying you is an art form that requires dedication!",
            emoji: "😇",
            husbandBanter: "If I don't annoy you for 2 hours, check my pulse.",
          },
          {
            text: "Me! (I have my dramatic moments)",
            reaction: "Aww! But your drama is the cutest drama in the universe.",
            emoji: "👑",
            husbandBanter: "Your drama keeps our household entertaining and lively!",
          },
          {
            text: "We take turns being chaotic 🤝",
            reaction: "A teamwork answer! That's why we're partners in crime.",
            emoji: "🎭",
            husbandBanter: "Equal parts mischief, 100% love.",
          },
        ],
      },
      {
        id: 3,
        question: "Who is going to say 'I love you' first after seeing this website?",
        options: [
          {
            text: "Me! (Because this made me melt 🥹)",
            reaction: "Yay! I am currently waiting right here to hear it!",
            emoji: "🥰",
            husbandBanter: "Say it out loud right now, I'm listening! ❤️",
          },
          {
            text: "Him! (He can't resist saying it every 5 minutes)",
            reaction: "Guilty! I love you, I love you, I love you!",
            emoji: "💖",
            husbandBanter: "You beat me to it! I love you so much, my wife.",
          },
          {
            text: "We're going to say it at the exact same second 👩‍❤️‍💋‍👨",
            reaction: "Telepathic couple goals! You know me too well.",
            emoji: "✨",
            husbandBanter: "Synced hearts, synced words.",
          },
        ],
      },
      {
        id: 4,
        question: "What is my absolute favorite thing about you?",
        options: [
          {
            text: "Your radiant smile that lights up everything",
            reaction: "YES! Your smile is my daily dose of sunshine.",
            emoji: "🌟",
            husbandBanter: "Can stare at you smiling forever.",
          },
          {
            text: "Your soft, loving, golden heart",
            reaction: "YES! The pure soul that makes you so precious.",
            emoji: "💛",
            husbandBanter: "You make me want to be the best man I can be.",
          },
          {
            text: "Trick question: EVERYTHING about you ❤️",
            reaction: "BINGO! You scored 1000%! Every single millimeter of you.",
            emoji: "🏆",
            husbandBanter: "There isn't a single flaw I wouldn't adore.",
          },
        ],
      },
      {
        id: 5,
        question: "Who loves whom more in this marriage?",
        options: [
          {
            text: "I do! (My love is infinite)",
            reaction: "A formidable contender! But I'm going to outlove you anyway.",
            emoji: "💗",
            husbandBanter: "Challenge accepted. Prepare for lifelong over-affection.",
          },
          {
            text: "He does! (He is hopelessly obsessed)",
            reaction: "Spot on! Completely, dangerously, irreversibly obsessed.",
            emoji: "😍",
            husbandBanter: "Can't help it when my wife is this irresistible.",
          },
          {
            text: "It's an infinite loop of love with no end ♾️",
            reaction: "The ultimate truth! 4 months down, eternity to go.",
            emoji: "💍",
            husbandBanter: "You and me, forever and always.",
          },
        ],
      },
    ],
  },

  quotes: {
    title: "A Little Collection of Love Quotes ✨",
    subtitle: "Original words from my heart to yours on our milestone.",
    list: [
      {
        quote: "Four months ago, I married you. Every day since then, I have found another reason to fall in love with you.",
        author: "Your Husband",
        tag: "Our Journey",
      },
      {
        quote: "You're not just my better half. You're my favorite part of every day.",
        author: "Your Husband",
        tag: "Daily Blessing",
      },
      {
        quote: "If I could relive a thousand moments, I would still want every single one of them to lead me back to you.",
        author: "Your Husband",
        tag: "Destiny",
      },
      {
        quote: "Marriage gave me a wife, but loving you gave me my favorite person, my partner in mischief, and my forever home.",
        author: "Your Husband",
        tag: "Forever Home",
      },
      {
        quote: "Some people search the whole universe for magic. I get to see mine smile every morning. ❤️",
        author: "Your Husband",
        tag: "Pure Magic",
      },
    ],
  },

  surprise: {
    heading: "Okay, One Last Surprise… 🎁",
    subtext: "I saved something special for you. But are you sure you're ready?",
    buttonText: "Yes, Show Me! ❤️",
    revealQuote: "My favorite place in the world isn't a city, a beach, or a beautiful destination. It's wherever I get to be with you. ❤️",
    revealCelebration: "Happy 4 Months, My Love. 🥂💍",
    revealPromise:
      "Here's to more laughter, more adventures, more silly fights over absolutely nothing, more tight hugs, more sweet kisses, and a lifetime of choosing each other over and over again. I love you, my beautiful wife. Forever your partner in crime.",
    revealTease:
      "P.S. Your husband is accepting unlimited hugs and kisses as anniversary payment. No refunds. No expiry date. 😏💋",
  },

  finalFeedback: {
    question: "So, Madam Wife… How Was Your Surprise? ❤️",
    options: [
      {
        id: "love",
        label: "Awww, I Love You ❤️",
        reactionTitle: "You Melted My Heart! 🥰",
        reactionMessage: "You just made your husband the happiest man alive. Come collect your hugs right now! ❤️",
        emoji: "💖",
      },
      {
        id: "dramatic",
        label: "You're So Dramatic 😂",
        reactionTitle: "Guilty As Charged! 😌",
        reactionMessage: "Excuse me, madam. This is what happens when a husband is dangerously and helplessly in love with his wife.",
        emoji: "🎭",
      },
      {
        id: "come_here",
        label: "Come Here, You! 🥹💋",
        reactionTitle: "Order Received! 🏃💨",
        reactionMessage: "Mission accomplished. Your husband is officially sprinting on his way for warm hugs and kisses. 💋❤️",
        emoji: "🫂",
      },
    ],
  },
};
