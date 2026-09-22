// KNOX BOT - 300 COMMANDS
// 30 categories × 10 commands = 300

const categories = {

  general: [
    "menu", "help", "ping", "alive", "bot",
    "info", "owner", "uptime", "status", "commands"
  ],

  utility: [
    "calculate", "weather", "time", "date", "translate",
    "shortlink", "qr", "barcode", "reminder", "timer"
  ],

  downloader: [
    "ytmp3", "ytmp4", "play", "song", "video",
    "tiktok", "instagram", "facebook", "twitter", "mediafire"
  ],

  search: [
    "google", "wikipedia", "github", "npm", "youtube",
    "image", "news", "lyrics", "define", "search"
  ],

  anime: [
    "anime", "character", "manga", "waifu", "neko",
    "kitsune", "animequote", "animesearch", "animewall", "animememe"
  ],

  games: [
    "8ball", "dice", "coinflip", "rps", "guess",
    "quiz", "trivia", "slots", "tictactoe", "hangman"
  ],

  fun: [
    "joke", "meme", "quote", "fact", "truth",
    "dare", "roast", "compliment", "ship", "rate"
  ],

  group: [
    "add", "kick", "promote", "demote", "mute",
    "unmute", "tagall", "hidetag", "groupinfo", "groupname"
  ],

  admin: [
    "ban", "unban", "warn", "warnings", "clearwarn",
    "antilink", "antispam", "welcome", "goodbye", "lock"
  ],

  owner: [
    "broadcast", "restart", "shutdown", "eval", "exec",
    "setprefix", "setowner", "setname", "setbio", "setstatus"
  ],

  media: [
    "sticker", "toimg", "tovideo", "tourl", "removebg",
    "enhance", "blur", "crop", "resize", "rotate"
  ],

  ai: [
    "ai", "ask", "chat", "gpt", "imagine",
    "rewrite", "summarize", "explain", "code", "translateai"
  ],

  social: [
    "instagram", "facebook", "twitter", "tiktok", "telegram",
    "reddit", "pinterest", "linkedin", "snapchat", "threads"
  ],

  information: [
    "news", "facts", "history", "science", "space",
    "country", "capital", "currency", "language", "dictionary"
  ],

  education: [
    "math", "english", "physics", "chemistry", "biology",
    "government", "geography", "economics", "literature", "computer"
  ],

  islam: [
    "quran", "hadith", "dua", "prayer", "surah",
    "allah", "ramadan", "zakat", "hajj", "islamic"
  ],

  christian: [
    "bible", "verse", "prayer", "jesus", "god",
    "psalm", "proverb", "church", "faith", "christian"
  ],

  relationship: [
    "love", "couple", "crush", "flirt", "ship",
    "compatibility", "truth", "dare", "kiss", "date"
  ],

  reactions: [
    "happy", "sad", "angry", "love", "laugh",
    "cry", "clap", "dance", "hug", "wave"
  ],

  animefun: [
    "naruto", "onepiece", "bleach", "dragonball", "jujutsu",
    "demon", "pokemon", "attackontitan", "solo", "deathnote"
  ],

  football: [
    "football", "soccer", "scores", "fixtures", "league",
    "premierleague", "laliga", "ucl", "player", "club"
  ],

  gaming: [
    "freefire", "pubg", "minecraft", "fortnite", "roblox",
    "fifa", "codm", "valorant", "gaming", "gamer"
  ],

  coding: [
    "javascript", "python", "html", "css", "nodejs",
    "github", "git", "npm", "api", "coding"
  ],

  developer: [
    "dev", "developer", "debug", "error", "logs",
    "server", "database", "json", "regex", "terminal"
  ],

  stickers: [
    "sticker", "stickergif", "stickerpack", "stickersearch", "emojisticker",
    "animatesticker", "textsticker", "quotesticker", "memesticker", "randomsticker"
  ],

  text: [
    "say", "echo", "uppercase", "lowercase", "reverse",
    "count", "repeat", "bold", "italic", "randomtext"
  ],

  fun2: [
    "wouldyourather", "neverhaveiever", "truthordare", "pickone", "challenge",
    "question", "riddle", "brain", "guessword", "random"
  ],

  tools: [
    "password", "uuid", "base64", "encode", "decode",
    "timestamp", "color", "calculator", "percentage", "convert"
  ],

  bot: [
    "restartbot", "reload", "memory", "clear", "prefix",
    "settings", "config", "version", "system", "runtime"
  ],

  extra: [
    "menu2", "allmenu", "list", "ping2", "test",
    "support", "contact", "feedback", "report", "about"
  ]

};

// Create one flat list containing all commands
const commands = Object.values(categories).flat();

module.exports = {
  categories,
  commands
};
