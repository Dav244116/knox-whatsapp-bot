// KNOX BOT - 300 COMMANDS
// 30 categories × 10 commands = 300 commands

const categories = {
  general: [
    "menu", "help", "ping", "alive", "owner",
    "botinfo", "about", "rules", "status", "commands"
  ],

  fun: [
    "joke", "fact", "quote", "8ball", "dice",
    "coinflip", "rps", "truth", "dare", "random"
  ],

  social: [
    "love", "friend", "hello", "hi", "bye",
    "goodmorning", "goodnight", "welcome", "thanks", "sorry"
  ],

  games: [
    "guess", "number", "choose", "quiz", "score",
    "level", "rank", "challenge", "battle", "spin"
  ],

  utility: [
    "time", "date", "day", "month", "year",
    "calc", "count", "repeat", "say", "reverse"
  ],

  text: [
    "uppercase", "lowercase", "length", "words", "letters",
    "capitalize", "shuffle", "binary", "emoji", "morse"
  ],

  information: [
    "weather", "news", "internet", "server", "version",
    "uptime", "system", "platform", "engine", "developer"
  ],

  reactions: [
    "happy", "sad", "angry", "laugh", "cry",
    "cool", "wow", "loveemoji", "fire", "respect"
  ],

  motivation: [
    "motivate", "success", "focus", "dream", "strong",
    "believe", "neverquit", "discipline", "goals", "progress"
  ],

  knowledge: [
    "science", "space", "earth", "history", "math",
    "computer", "technology", "animal", "human", "ocean"
  ],

  school: [
    "study", "exam", "english", "maths", "biology",
    "physics", "chemistry", "government", "geography", "school"
  ],

  football: [
    "football", "soccer", "goal", "striker", "keeper",
    "defender", "midfielder", "coach", "stadium", "trophy"
  ],

  gaming: [
    "gaming", "gamer", "player", "game", "win",
    "lose", "ranked", "match", "team", "clutch"
  ],

  freefire: [
    "freefire", "booyah", "headshot", "gloo", "weapon",
    "character", "rankedff", "squad", "duo", "solo"
  ],

  anime: [
    "anime", "naruto", "dragonball", "onepiece", "bleach",
    "demon", "ninja", "hokage", "senpai", "otaku"
  ],

  music: [
    "music", "song", "artist", "album", "beat",
    "dance", "vibe", "playlist", "concert", "melody"
  ],

  food: [
    "food", "pizza", "burger", "rice", "chicken",
    "fruit", "snack", "breakfast", "lunch", "dinner"
  ],

  animals: [
    "dog", "cat", "lion", "tiger", "elephant",
    "monkey", "bird", "fish", "horse", "rabbit"
  ],

  nature: [
    "nature", "tree", "flower", "rain", "sun",
    "moon", "star", "cloud", "river", "mountain"
  ],

  nigeria: [
    "nigeria", "lagos", "abuja", "enugu", "ibadan",
    "kano", "onitsha", "nsukka", "naira", "africa"
  ],

  technology: [
    "tech", "android", "iphone", "computer", "coding",
    "javascript", "nodejs", "github", "railway", "api"
  ],

  whatsapp: [
    "whatsapp", "message", "chat", "group", "contact",
    "online", "offline", "privacy", "profile", "statuswa"
  ],

  bot: [
    "bot", "botname", "botstatus", "botversion", "botowner",
    "bothelp", "botmenu", "botinfo2", "botping", "botabout"
  ],

  emojis: [
    "emoji", "smile", "heart", "fireemoji", "laughemoji",
    "coolemoji", "sademoji", "angryemoji", "star", "crown"
  ],

  personality: [
    "knox", "great", "king", "legend", "boss",
    "champion", "master", "hero", "emperor", "goat"
  ],

  challenges: [
    "challenge1", "challenge2", "challenge3", "challenge4", "challenge5",
    "challenge6", "challenge7", "challenge8", "challenge9", "challenge10"
  ],

  random: [
    "random1", "random2", "random3", "random4", "random5",
    "random6", "random7", "random8", "random9", "random10"
  ],

  extras: [
    "extra1", "extra2", "extra3", "extra4", "extra5",
    "extra6", "extra7", "extra8", "extra9", "extra10"
  ],

  knox: [
    "knox1", "knox2", "knox3", "knox4", "knox5",
    "knox6", "knox7", "knox8", "knox9", "knox10"
  ]
};

// Build all 300 commands
const commands = {};

for (const [category, list] of Object.entries(categories)) {
  for (const command of list) {
    commands[command] = {
      category,
      response: `👑 Knox Bot\n\nYou used .${command}\n\n⚡ Category: ${category}\n🤖 Knox The Great Bot`
    };
  }
}

// Special responses
commands.ping.response = "🏓 Pong! Knox Bot is online 🚀";
commands.alive.response = "✅ Knox Bot is alive and running!";
commands.owner.response = "👑 Owner: Knox The Great";
commands.botinfo.response =
  "🤖 Knox WhatsApp Bot\n⚡ Powered by Evolution API";
commands.about.response =
  "👑 Knox Bot\n\nA custom WhatsApp bot created for Knox The Great.";
commands.rules.response =
  "📜 KNOX BOT RULES\n\n1. Respect everyone.\n2. No spam.\n3. No scams.\n4. Have fun responsibly.";
commands.joke.response =
  "😂 Why did the computer go to the doctor?\nBecause it had a virus!";
commands.fact.response =
  "🧠 Fun fact: Honey can remain edible for a very long time when stored properly.";
commands.quote.response =
  "💭 Keep moving forward. Small progress is still progress.";
commands.love.response =
  "❤️ Positive vibes from Knox Bot!";
commands.goodmorning.response =
  "🌅 Good morning! Have an amazing day!";
commands.goodnight.response =
  "🌙 Good night! Sleep well and stay safe.";
commands.motivate.response =
  "🔥 Keep going! Small progress is still progress.";

module.exports = {
  categories,
  commands,
  total: Object.keys(commands).length
};
