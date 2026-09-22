// KNOX BOT - 300 COMMANDS
// 30 categories × 10 commands = 300 commands

const categories = {
  general: [
    "menu",
    "help",
    "ping",
    "alive",
    "bot",
    "info",
    "owner",
    "uptime",
    "status",
    "commands"
  ],

  fun: [
    "joke",
    "meme",
    "quote",
    "fact",
    "truth",
    "dare",
    "riddle",
    "8ball",
    "compliment",
    "roast"
  ],

  games: [
    "game",
    "dice",
    "coinflip",
    "guess",
    "quiz",
    "tictactoe",
    "slots",
    "numbergame",
    "wordgame",
    "trivia"
  ],

  group: [
    "groupinfo",
    "grouplink",
    "groupid",
    "admins",
    "members",
    "tagall",
    "hidetag",
    "tagadmins",
    "groupstats",
    "welcome"
  ],

  admin: [
    "kick",
    "add",
    "promote",
    "demote",
    "mute",
    "unmute",
    "warn",
    "warnings",
    "resetwarn",
    "adminlist"
  ],

  moderation: [
    "antilink",
    "antispam",
    "antibot",
    "antiflood",
    "antitag",
    "antinsult",
    "antidelete",
    "autoread",
    "autotyping",
    "modsettings"
  ],

  media: [
    "sticker",
    "toimage",
    "tovideo",
    "toaudio",
    "mp3",
    "mp4",
    "gif",
    "voice",
    "photo",
    "media"
  ],

  download: [
    "ytmp3",
    "ytmp4",
    "youtube",
    "tiktok",
    "instagram",
    "facebook",
    "twitter",
    "mediafire",
    "gdrive",
    "download"
  ],

  search: [
    "google",
    "wikipedia",
    "image",
    "news",
    "weather",
    "lyrics",
    "github",
    "npm",
    "translate",
    "search"
  ],

  ai: [
    "ai",
    "ask",
    "chat",
    "imagine",
    "summarize",
    "rewrite",
    "explain",
    "translateai",
    "codeai",
    "aichat"
  ],

  utility: [
    "calc",
    "shortlink",
    "qr",
    "readqr",
    "timer",
    "stopwatch",
    "reminder",
    "date",
    "time",
    "convert"
  ],

  tools: [
    "base64",
    "decode",
    "encode",
    "hash",
    "md5",
    "sha256",
    "uuid",
    "password",
    "binary",
    "json"
  ],

  text: [
    "uppercase",
    "lowercase",
    "reverse",
    "bold",
    "italic",
    "underline",
    "strike",
    "tiny",
    "bubble",
    "fancy"
  ],

  funtext: [
    "say",
    "repeat",
    "mock",
    "clap",
    "ship",
    "love",
    "hate",
    "rate",
    "choose",
    "pick"
  ],

  reactions: [
    "hug",
    "kiss",
    "slap",
    "pat",
    "poke",
    "wave",
    "smile",
    "laugh",
    "cry",
    "angry"
  ],

  anime: [
    "anime",
    "waifu",
    "neko",
    "manga",
    "naruto",
    "onepiece",
    "dragonball",
    "bleach",
    "jujutsu",
    "demon"
  ],

  wallpapers: [
    "wallpaper",
    "animewall",
    "naturewall",
    "carwall",
    "gamingwall",
    "darkwall",
    "amwall",
    "pmwall",
    "phonewall",
    "randomwall"
  ],

  images: [
    "imagegen",
    "searchimage",
    "logo",
    "avatar",
    "banner",
    "profile",
    "cover",
    "thumbnail",
    "editimage",
    "enhance"
  ],

  stickers: [
    "stickerpack",
    "steal",
    "take",
    "stickerinfo",
    "stickers",
    "emoji",
    "emojimix",
    "stickersearch",
    "stickerlist",
    "randomsticker"
  ],

  music: [
    "song",
    "music",
    "play",
    "pause",
    "resume",
    "skip",
    "volume",
    "nowplaying",
    "playlist",
    "lyrics"
  ],

  status: [
    "status",
    "statusview",
    "statussave",
    "statusreply",
    "statusreact",
    "statusmention",
    "statuslist",
    "statusdownload",
    "statusinfo",
    "statushelp"
  ],

  owner: [
    "owner",
    "creator",
    "contactowner",
    "broadcast",
    "restart",
    "shutdown",
    "update",
    "setprefix",
    "setname",
    "setbio"
  ],

  bot: [
    "botinfo",
    "botname",
    "botversion",
    "botmode",
    "botprefix",
    "botstatus",
    "botstats",
    "botping",
    "botuptime",
    "bothelp"
  ],

  security: [
    "security",
    "block",
    "unblock",
    "blocklist",
    "privacy",
    "antidelete",
    "protect",
    "lock",
    "unlock",
    "securityinfo"
  ],

  profile: [
    "profile",
    "avatar",
    "bio",
    "setbio",
    "setavatar",
    "userinfo",
    "number",
    "jid",
    "username",
    "profileinfo"
  ],

  funcommands: [
    "shipme",
    "couple",
    "match",
    "compatibility",
    "friendship",
    "bestie",
    "crush",
    "lovecheck",
    "luck",
    "fortune"
  ],

  games2: [
    "blackjack",
    "hangman",
    "rps",
    "connect4",
    "memory",
    "mathgame",
    "typing",
    "reaction",
    "fastanswer",
    "challenge"
  ],

  information: [
    "country",
    "capital",
    "currency",
    "population",
    "timezone",
    "language",
    "continent",
    "internet",
    "phonecode",
    "postcode"
  ],

  education: [
    "define",
    "meaning",
    "dictionary",
    "grammar",
    "spell",
    "math",
    "science",
    "history",
    "geography",
    "study"
  ],

  developer: [
    "github",
    "git",
    "npm",
    "node",
    "javascript",
    "html",
    "css",
    "python",
    "api",
    "developer"
  ],

  extras: [
    "random",
    "choose",
    "yesno",
    "truthbomb",
    "factcheck",
    "daily",
    "motivate",
    "advice",
    "tip",
    "secret"
  ]
};

// Create a flat list containing all commands
const commands = {};

for (const [category, list] of Object.entries(categories)) {
  for (const command of list) {
    commands[command] = category;
  }
}

// Export everything for use in index.js
module.exports = {
  categories,
  commands
};
