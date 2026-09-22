// KNOX BOT - COMMANDS300

const categories = {

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

  fun: [
    "ship", "rate", "roast", "compliment", "pick",
    "choose", "truth", "dare", "wouldyourather", "compatibility"
  ],

  tools: [
    "sticker", "toimg", "tovideo", "tourl", "removebg",
    "enhance", "blur", "crop", "resize", "rotate"
  ]

};

const commands = Object.values(categories).flat();

module.exports = { categories, commands };
