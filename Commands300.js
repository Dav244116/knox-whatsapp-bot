// KNOX BOT
// 100 WORKING COMMANDS
// Owner: Knox The Great
// Owner Number: 2348155033420

const categories = {
  GENERAL: [
    "menu", "help", "ping", "alive", "bot",
    "info", "owner", "uptime", "status", "commands"
  ],

  FUN: [
    "joke", "quote", "fact", "truth", "dare",
    "roast", "ship", "love", "laugh", "compliment"
  ],

  GAMES: [
    "dice", "coin", "rps", "number", "guess",
    "8ball", "roll", "slot", "math", "random"
  ],

  UTILITY: [
    "time", "date", "calc", "count", "reverse",
    "upper", "lower", "length", "echo", "choose"
  ],

  GROUP: [
    "groupinfo", "members", "admins", "tagall", "hidetag",
    "groupid", "owner", "rules", "welcome", "goodbye"
  ],

  MEDIA: [
    "sticker", "image", "audio", "video", "play",
    "song", "yt", "download", "media", "qr"
  ],

  TOOLS: [
    "uuid", "password", "base64", "unbase64", "json",
    "binary", "unbinary", "hex", "unhex", "timestamp"
  ],

  OWNER: [
    "broadcast", "restart", "setprefix", "botnumber", "config",
    "ownerinfo", "private", "public", "maintenance", "shutdown"
  ],

  SOCIAL: [
    "goodmorning", "goodnight", "welcome", "thanks", "sorry",
    "motivate", "advice", "factcheck", "statusmsg", "profile"
  ],

  EXTRA: [
    "menu2", "knox", "great", "version", "support",
    "report", "feedback", "donate", "link", "connect"
  ]
};

const commands = {
  // GENERAL
  ping: "pong",
  alive: "alive",
  bot: "info",
  info: "info",
  owner: "owner",
  uptime: "uptime",
  status: "status",
  commands: "menu",
  help: "menu",

  // FUN
  joke: "joke",
  quote: "quote",
  fact: "fact",
  truth: "truth",
  dare: "dare",
  roast: "roast",
  ship: "ship",
  love: "love",
  laugh: "laugh",
  compliment: "compliment",

  // GAMES
  dice: "dice",
  coin: "coin",
  rps: "rps",
  number: "number",
  guess: "guess",
  "8ball": "8ball",
  roll: "roll",
  slot: "slot",
  math: "math",
  random: "random",

  // UTILITY
  time: "time",
  date: "date",
  calc: "calc",
  count: "count",
  reverse: "reverse",
  upper: "upper",
  lower: "lower",
  length: "length",
  echo: "echo",
  choose: "choose",

  // GROUP
  groupinfo: "groupinfo",
  members: "members",
  admins: "admins",
  tagall: "tagall",
  hidetag: "hidetag",
  groupid: "groupid",
  rules: "rules",
  welcome: "welcome",
  goodbye: "goodbye",

  // MEDIA
  sticker: "sticker",
  image: "image",
  audio: "audio",
  video: "video",
  play: "play",
  song: "song",
  yt: "yt",
  download: "download",
  media: "media",
  qr: "qr",

  // TOOLS
  uuid: "uuid",
  password: "password",
  base64: "base64",
  unbase64: "unbase64",
  json: "json",
  binary: "binary",
  unbinary: "unbinary",
  hex: "hex",
  unhex: "unhex",
  timestamp: "timestamp",

  // OWNER
  broadcast: "owner",
  restart: "owner",
  setprefix: "owner",
  botnumber: "botnumber",
  config: "owner",
  ownerinfo: "owner",
  private: "owner",
  public: "owner",
  maintenance: "owner",
  shutdown: "owner",

  // SOCIAL
  goodmorning: "goodmorning",
  goodnight: "goodnight",
  thanks: "thanks",
  sorry: "sorry",
  motivate: "motivate",
  advice: "advice",
  factcheck: "fact",
  statusmsg: "statusmsg",
  profile: "profile",

  // EXTRA
  menu2: "menu",
  knox: "info",
  great: "great",
  version: "version",
  support: "support",
  report: "report",
  feedback: "feedback",
  donate: "donate",
  link: "link",
  connect: "connect"
};

module.exports = {
  categories,
  commands
};