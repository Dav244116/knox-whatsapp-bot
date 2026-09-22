const express = require("express"); 
const axios = require("axios");
const { categories, commands } = require("./Commands300");

const app = express();
app.use(express.json());

// ===============================
// KNOX BOT SETTINGS
// ===============================

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.BOT_PREFIX || ".";
const OWNER = process.env.BOT_OWNER || "Knox The Great";

// ⚠️ PUT YOUR WHATSAPP NUMBER HERE
// Example: 2348155033420
const OWNER_NUMBER =
  process.env.OWNER_NUMBER || "2348155033420";

// Put a direct image URL here later.
// Leave it empty for now if you don't have one.
const MENU_IMAGE_URL =
  process.env.MENU_IMAGE_URL || "";

const EVOLUTION_API_URL =
  process.env.EVOLUTION_API_URL;

const EVOLUTION_API_KEY =
  process.env.EVOLUTION_API_KEY;

const EVOLUTION_INSTANCE =
  process.env.EVOLUTION_INSTANCE;


// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
  res.send("Knox WhatsApp Bot is running 🚀");
});


// ===============================
// HEALTH
// ===============================

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    bot: "KNOX BOT",
    owner: OWNER,
    commands: commands.length,
    uptime: Math.floor(process.uptime())
  });
});


// ===============================
// SEND TEXT
// ===============================

async function sendMessage(number, text) {

  if (
    !EVOLUTION_API_URL ||
    !EVOLUTION_API_KEY ||
    !EVOLUTION_INSTANCE
  ) {
    console.error(
      "Evolution API environment variables are missing."
    );
    return;
  }

  try {

    await axios.post(

      `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`,

      {
        number: number,
        text: text
      },

      {
        headers: {
          apikey: EVOLUTION_API_KEY,
          "Content-Type": "application/json"
        }
      }

    );

    console.log(`Message sent to ${number}`);

  } catch (error) {

    console.error(
      "Send message error:",
      error.response?.data || error.message
    );

  }
}


// ===============================
// SEND IMAGE
// ===============================

async function sendImage(
  number,
  imageUrl,
  caption
) {

  if (!imageUrl) {

    return sendMessage(
      number,
      caption
    );

  }

  try {

    await axios.post(

      `${EVOLUTION_API_URL}/message/sendMedia/${EVOLUTION_INSTANCE}`,

      {
        number: number,
        mediatype: "image",
        mimetype: "image/jpeg",
        media: imageUrl,
        caption: caption,
        fileName: "knox-menu.jpg"
      },

      {
        headers: {
          apikey: EVOLUTION_API_KEY,
          "Content-Type": "application/json"
        }
      }

    );

    console.log(
      `Menu picture sent to ${number}`
    );

  } catch (error) {

    console.error(
      "Send image error:",
      error.response?.data || error.message
    );

    // If picture fails, send the menu as text
    await sendMessage(
      number,
      caption
    );

  }
}


// ===============================
// GET MESSAGE TEXT
// ===============================

function getMessageText(message) {

  if (!message) return "";

  return (

    message.conversation ||

    message.extendedTextMessage?.text ||

    message.imageMessage?.caption ||

    message.videoMessage?.caption ||

    message.documentMessage?.caption ||

    ""

  ).trim();

}


// ===============================
// BUILD MENU
// ===============================

function buildMenu() {

  let menu = "";

  menu +=
    "╭━━━〔 👑 KNOX BOT 〕━━━╮\n";

  menu += "┃\n";

  menu +=
    `┃ 👤 Owner : ${OWNER}\n`;

  menu +=
    "┃ 🤖 Bot   : KNOX BOT\n";

  menu +=
    `┃ ⚡ Prefix: ${PREFIX}\n`;

  menu +=
    `┃ 📚 Total : ${commands.length} Commands\n`;

  menu += "┃\n";

  menu +=
    "╰━━━━━━━━━━━━━━━━━━━━╯\n\n";


  for (
    const [category, list]
    of Object.entries(categories)
  ) {

    menu +=
      `╭━━〔 ${category.toUpperCase()} 〕━━╮\n`;

    for (
      const command of list
    ) {

      menu +=
        `┃ ${PREFIX}${command}\n`;

    }

    menu +=
      "╰━━━━━━━━━━━━━━━━━━━━╯\n\n";

  }

  return menu.trim();

}


// ===============================
// COMMAND HANDLER
// ===============================

async function handleCommand(number, text) {

  if (!text.startsWith(PREFIX)) return;

  const input = text.slice(PREFIX.length).trim();
  if (!input) return;

  const parts = input.split(/\s+/);
  const command = parts.shift().toLowerCase();
  const query = parts.join(" ");

  const reply = (msg) => sendMessage(number, msg);

  console.log(`Command: ${PREFIX}${command}`);

  // ===============================
  // GENERAL
  // ===============================

  if (["menu", "help", "commands"].includes(command)) {
    return sendImage(number, MENU_IMAGE_URL, buildMenu());
  }

  if (command === "ping") {
    return reply("🏓 Pong!\n\n🤖 KNOX BOT is online.");
  }

  if (command === "alive") {
    return reply(
      "╭━━〔 👑 KNOX BOT 〕━━╮\n" +
      "┃ 🟢 Status: ONLINE\n" +
      `┃ 👑 Owner: ${OWNER}\n` +
      `┃ 📚 Commands: ${commands.length}\n` +
      "╰━━━━━━━━━━━━━━━━━━╯"
    );
  }

  if (["bot", "info", "botinfo"].includes(command)) {
    return reply(
      "🤖 KNOX BOT\n\n" +
      `👑 Owner: ${OWNER}\n` +
      `⚡ Prefix: ${PREFIX}\n` +
      `📚 Commands: ${commands.length}\n` +
      "🟢 Status: Online"
    );
  }

  if (["owner", "creator"].includes(command)) {
    return reply(`👑 KNOX BOT OWNER\n\n${OWNER}`);
  }

  if (command === "uptime") {
    const s = Math.floor(process.uptime());
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    return reply(`⏱️ UPTIME\n\n${d}d ${h}h ${m}m ${sec}s`);
  }

  if (command === "status") {
    return reply(
      "🟢 KNOX BOT STATUS\n\n" +
      "🤖 Bot: Online\n" +
      "🔌 API: Connected\n" +
      `📚 Commands: ${commands.length}`
    );
  }

  if (command === "about") {
    return reply(
      "👑 KNOX BOT\n\n" +
      "WhatsApp bot created by Knox The Great.\n\n" +
      `Use ${PREFIX}menu to see commands.`
    );
  }

  // ===============================
  // TEXT
  // ===============================

  if (["say", "echo"].includes(command)) {
    if (!query) return reply(`Usage: ${PREFIX}${command} hello`);
    return reply(query);
  }

  if (command === "uppercase") {
    if (!query) return reply(`Usage: ${PREFIX}uppercase hello`);
    return reply(query.toUpperCase());
  }

  if (command === "lowercase") {
    if (!query) return reply(`Usage: ${PREFIX}lowercase HELLO`);
    return reply(query.toLowerCase());
  }

  if (command === "reverse") {
    if (!query) return reply(`Usage: ${PREFIX}reverse hello`);
    return reply(query.split("").reverse().join(""));
  }

  if (command === "count") {
    if (!query) return reply(`Usage: ${PREFIX}count hello world`);
    return reply(`🔢 Characters: ${query.length}`);
  }

  if (command === "bold") {
    if (!query) return reply(`Usage: ${PREFIX}bold hello`);
    return reply(`*${query}*`);
  }

  if (command === "italic") {
    if (!query) return reply(`Usage: ${PREFIX}italic hello`);
    return reply(`_${query}_`);
  }

  // ===============================
  // UTILITY
  // ===============================

  if (command === "date") {
    return reply(
      `📅 ${new Date().toLocaleDateString("en-NG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })}`
    );
  }

  if (command === "time") {
    return reply(
      `🕐 ${new Date().toLocaleTimeString("en-NG")}`
    );
  }

  if (command === "calculate" || command === "calculator") {
    if (!query) return reply(`Usage: ${PREFIX}calculate 25*4`);

    if (!/^[0-9+\-*/().%\s]+$/.test(query)) {
      return reply("❌ Only basic numbers and operators are allowed.");
    }

    try {
      const result = Function(`"use strict"; return (${query})`)();
      return reply(`🧮 ${query} = ${result}`);
    } catch {
      return reply("❌ Invalid calculation.");
    }
  }

  if (command === "percentage") {
    if (args.length < 2) {
      return reply(`Usage: ${PREFIX}percentage 20 500`);
    }

    const percent = Number(args[0]);
    const value = Number(args[1]);

    if (isNaN(percent) || isNaN(value)) {
      return reply("❌ Enter valid numbers.");
    }

    return reply(`📊 ${percent}% of ${value} = ${(percent / 100) * value}`);
  }

  if (command === "qr") {
    if (!query) return reply(`Usage: ${PREFIX}qr hello`);

    const url =
      `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(query)}`;

    return sendImage(number, url, `📱 QR CODE\n\n${query}`);
  }

  if (command === "shortlink") {
    if (!query) return reply(`Usage: ${PREFIX}shortlink https://example.com`);

    try {
      const r = await axios.get(
        "https://tinyurl.com/api-create.php",
        { params: { url: query } }
      );

      return reply(`🔗 Short link:\n${r.data}`);
    } catch {
      return reply("❌ Could not create short link.");
    }
  }

  // ===============================
  // SEARCH
  // ===============================

  if (["google", "search"].includes(command)) {
    if (!query) return reply(`Usage: ${PREFIX}${command} KNOX BOT`);

    return reply(
      `🔎 Google Search\n\nhttps://www.google.com/search?q=${encodeURIComponent(query)}`
    );
  }

  if (command === "youtube") {
    if (!query) return reply(`Usage: ${PREFIX}youtube KNOX BOT`);

    return reply(
      `▶️ YouTube Search\n\nhttps://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    );
  }

  if (command === "image") {
    if (!query) return reply(`Usage: ${PREFIX}image anime`);

    return reply(
      `🖼️ Image Search\n\nhttps://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`
    );
  }

  if (command === "news") {
    if (!query) return reply(`Usage: ${PREFIX}news Nigeria`);

    return reply(
      `📰 News Search\n\nhttps://www.google.com/search?tbm=nws&q=${encodeURIComponent(query)}`
    );
  }

  if (command === "wikipedia") {
    if (!query) return reply(`Usage: ${PREFIX}wikipedia Nigeria`);

    try {
      const r = await axios.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );

      return reply(
        `📚 ${r.data.title}\n\n${r.data.extract || "No summary found."}`
      );
    } catch {
      return reply("❌ Wikipedia article not found.");
    }
  }

  if (command === "define" || command === "dictionary") {
    if (!query) return reply(`Usage: ${PREFIX}define technology`);

    try {
      const r = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query)}`
      );

      const meaning =
        r.data[0]?.meanings?.[0]?.definitions?.[0]?.definition;

      return reply(`📖 ${query}\n\n${meaning || "Definition unavailable."}`);
    } catch {
      return reply("❌ Word not found.");
    }
  }

  // ===============================
  // GAMES
  // ===============================

  if (command === "dice") {
    return reply(
      `🎲 You rolled: ${Math.floor(Math.random() * 6) + 1}`
    );
  }

  if (command === "coinflip") {
    return reply(
      Math.random() < 0.5 ? "🪙 HEADS!" : "🪙 TAILS!"
    );
  }

  if (command === "8ball") {
    const answers = [
      "🎱 Yes.",
      "🎱 No.",
      "🎱 Maybe.",
      "🎱 Definitely.",
      "🎱 Ask again later."
    ];

    return reply(
      answers[Math.floor(Math.random() * answers.length)]
    );
  }

  if (command === "rps") {
    const choices = ["rock", "paper", "scissors"];

    if (!choices.includes(query.toLowerCase())) {
      return reply(`Usage: ${PREFIX}rps rock`);
    }

    const player = query.toLowerCase();
    const bot = choices[Math.floor(Math.random() * 3)];

    if (player === bot) {
      return reply(`🤝 DRAW!\n\nYou: ${player}\nBot: ${bot}`);
    }

    const win =
      (player === "rock" && bot === "scissors") ||
      (player === "paper" && bot === "rock") ||
      (player === "scissors" && bot === "paper");

    return reply(
      `${win ? "🏆 YOU WIN!" : "🤖 BOT WINS!"}\n\n` +
      `You: ${player}\nBot: ${bot}`
    );
  }

  // ===============================
  // FUN
  // ===============================

  if (command === "joke") {
    const jokes = [
      "😂 Why did the phone go to school? To improve its connection!",
      "😂 My code works... I have no idea why.",
      "😂 Programmer's favorite place? The cache."
    ];

    return reply(jokes[Math.floor(Math.random() * jokes.length)]);
  }

  if (command === "fact") {
    const facts = [
      "🌍 Nigeria is the most populous country in Africa.",
      "🧠 The human brain contains billions of neurons.",
      "🌊 Water covers most of Earth's surface."
    ];

    return reply(facts[Math.floor(Math.random() * facts.length)]);
  }

  if (command === "quote") {
    const quotes = [
      "💡 Keep learning and keep building.",
      "🔥 Small progress is still progress.",
      "👑 Stay focused on your goals."
    ];

    return reply(quotes[Math.floor(Math.random() * quotes.length)]);
  }

  if (command === "compliment") {
    return reply("🔥 You're doing great. Keep pushing forward!");
  }

  if (command === "roast") {
    return reply("😂 You're not slow... you're just loading.");
  }

  if (command === "truth") {
    return reply("🎯 Truth: What is one goal you really want to achieve?");
  }

  if (command === "dare") {
    return reply("🎯 Dare: Send a funny emoji to the group.");
  }

  // ===============================
  // ANIME
  // ===============================

  if (command === "anime") {
    if (!query) return reply(`Usage: ${PREFIX}anime Naruto`);

    try {
      const r = await axios.get(
        "https://api.jikan.moe/v4/anime",
        { params: { q: query, limit: 1 } }
      );

      const anime = r.data.data?.[0];

      if (!anime) return reply("❌ Anime not found.");

      return reply(
        `🎌 ${anime.title}\n\n` +
        `⭐ Score: ${anime.score || "N/A"}\n` +
        `📺 Episodes: ${anime.episodes || "N/A"}\n` +
        `📅 Status: ${anime.status || "N/A"}`
      );
    } catch {
      return reply("❌ Anime service unavailable.");
    }
  }

  if (command === "waifu" || command === "neko") {
    try {
      const r = await axios.get(
        `https://api.waifu.pics/sfw/${command}`
      );

      return sendImage(number, r.data.url, `✨ ${command.toUpperCase()}`);
    } catch {
      return reply("❌ Image service unavailable.");
    }
  }

  // ===============================
  // UNKNOWN COMMAND
  // ===============================

  if (commands.includes(command)) {
    return reply(
      `⚙️ ${PREFIX}${command} is registered in KNOX BOT.\n\n` +
      `This command's full action is being added.\n` +
      `Use ${PREFIX}menu for available commands.`
    );
  }

  return reply(
    `❌ Unknown command: ${PREFIX}${command}\n\n` +
    `Use ${PREFIX}menu to see the commands.`
  );
      }



  // ===============================
  // HELPERS
  // ===============================

  const reply = async (message) => {
    return sendMessage(number, message);
  };

  const needInput = async (usage) => {
    if (!query) {
      await reply(`❌ Usage: ${PREFIX}${usage}`);
      return true;
    }

    return false;
  };


  // ===============================
  // GENERAL
  // ===============================

  if (command === "menu" ||
      command === "help" ||
      command === "commands") {

    return sendImage(
      number,
      MENU_IMAGE_URL,
      buildMenu()
    );
  }


  if (command === "ping") {
    return reply(
      "🏓 Pong!\n\n" +
      "🤖 KNOX BOT is online."
    );
  }


  if (command === "alive") {
    return reply(
      "╭━━〔 👑 KNOX BOT 〕━━╮\n" +
      "┃ 🟢 Status: ONLINE\n" +
      "┃ ⚡ Bot: Active\n" +
      `┃ 👑 Owner: ${OWNER}\n` +
      "╰━━━━━━━━━━━━━━━━━━╯"
    );
  }


  if (command === "bot") {
    return reply(
      "🤖 KNOX BOT\n\n" +
      `👑 Owner: ${OWNER}\n` +
      `⚡ Prefix: ${PREFIX}\n` +
      `📚 Commands: ${commands.length}`
    );
  }


  if (command === "info" ||
      command === "botinfo") {

    return reply(
      "╭━━〔 🤖 BOT INFO 〕━━╮\n" +
      `┃ 👑 Owner: ${OWNER}\n` +
      "┃ 🤖 Name: KNOX BOT\n" +
      `┃ ⚡ Prefix: ${PREFIX}\n` +
      `┃ 📚 Commands: ${commands.length}\n` +
      "┃ 🟢 Status: Online\n" +
      "╰━━━━━━━━━━━━━━━━━━╯"
    );
  }


  if (command === "owner" ||
      command === "creator") {

    return reply(
      `👑 KNOX BOT Owner\n\n${OWNER}`
    );
  }


  if (command === "uptime") {

    const seconds =
      Math.floor(process.uptime());

    const days =
      Math.floor(seconds / 86400);

    const hours =
      Math.floor(
        (seconds % 86400) / 3600
      );

    const minutes =
      Math.floor(
        (seconds % 3600) / 60
      );

    const secs =
      seconds % 60;

    return reply(
      "⏱️ KNOX BOT UPTIME\n\n" +
      `${days}d ${hours}h ${minutes}m ${secs}s`
    );
  }


  if (command === "status") {
    return reply(
      "🟢 KNOX BOT STATUS\n\n" +
      "🤖 Bot: Online\n" +
      "🔌 API: Connected\n" +
      `📚 Commands: ${commands.length}`
    );
  }


  if (command === "about") {
    return reply(
      "👑 KNOX BOT\n\n" +
      "A WhatsApp bot created for Knox The Great.\n\n" +
      `Type ${PREFIX}menu to view commands.`
    );
  }


  if (command === "echo" ||
      command === "say") {

    if (await needInput(`${command} hello`)) {
      return;
    }

    return reply(query);
  }


  // ===============================
  // UTILITY
  // ===============================

  if (command === "calculate") {

    if (await needInput("calculate 25*4")) {
      return;
    }

    // Safe calculator: numbers/operators only
    if (!/^[0-9+\-*/().%\s]+$/.test(query)) {
      return reply(
        "❌ Only numbers and basic math operators are allowed."
      );
    }

    try {
      const result = Function(
        `"use strict"; return (${query})`
      )();

      return reply(
        `🧮 ${query} = ${result}`
      );

    } catch {
      return reply("❌ Invalid calculation.");
    }
  }


  if (command === "date") {

    const now = new Date();

    return reply(
      "📅 DATE\n\n" +
      now.toLocaleDateString("en-NG", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    );
  }


  if (command === "time") {

    const now = new Date();

    return reply(
      "🕐 CURRENT TIME\n\n" +
      now.toLocaleTimeString("en-NG")
    );
  }


  if (command === "weather") {

    if (await needInput("weather Lagos")) {
      return;
    }

    try {

      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: 6.5244,
            longitude: 3.3792,
            current: "temperature_2m,relative_humidity_2m,weather_code",
            timezone: "Africa/Lagos"
          }
        }
      );

      const current =
        response.data.current;

      return reply(
        `🌤️ WEATHER\n\n` +
        `📍 ${query}\n` +
        `🌡️ Temperature: ${current.temperature_2m}°C\n` +
        `💧 Humidity: ${current.relative_humidity_2m}%`
      );

    } catch {
      return reply(
        "❌ Weather service is temporarily unavailable."
      );
    }
  }


  if (command === "translate") {

    if (await needInput("translate hello to French")) {
      return;
    }

    return reply(
      "🌐 Translation requires a translation API configuration.\n\n" +
      "The command is recognized, but no translation API is connected yet."
    );
  }


  if (command === "shortlink") {

    if (await needInput("shortlink https://example.com")) {
      return;
    }

    try {

      const response = await axios.get(
        "https://tinyurl.com/api-create.php",
        {
          params: {
            url: query
          }
        }
      );

      return reply(
        `🔗 Short link:\n${response.data}`
      );

    } catch {
      return reply(
        "❌ Could not create short link."
      );
    }
  }


  if (command === "qr") {

    if (await needInput("qr hello world")) {
      return;
    }

    const qrUrl =
      `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(query)}`;

    return sendImage(
      number,
      qrUrl,
      `📱 QR CODE\n\n${query}`
    );
  }


  if (command === "barcode") {

    if (await needInput("barcode 123456789")) {
      return;
    }

    const barcodeUrl =
      `https://barcodeapi.org/api/auto/${encodeURIComponent(query)}`;

    return sendImage(
      number,
      barcodeUrl,
      `📊 BARCODE\n\n${query}`
    );
  }


  if (command === "reminder") {

    if (await needInput("reminder drink water")) {
      return;
    }

    return reply(
      "⏰ Reminder command received.\n\n" +
      "A persistent reminder scheduler still needs to be connected."
    );
  }


  if (command === "timer") {

    if (await needInput("timer 10")) {
      return;
    }

    const seconds =
      Number(args[0]);

    if (
      !Number.isInteger(seconds) ||
      seconds <= 0 ||
      seconds > 3600
    ) {
      return reply(
        "❌ Enter seconds between 1 and 3600."
      );
    }

    await reply(
      `⏳ Timer started for ${seconds} seconds.`
    );

    setTimeout(async () => {

      await sendMessage(
        number,
        "⏰ TIME'S UP!"
      );

    }, seconds * 1000);

    return;
  }


  // ===============================
  // SEARCH
  // ===============================

  if (command === "google" ||
      command === "search") {

    if (await needInput(`${command} KNOX BOT`)) {
      return;
    }

    return reply(
      "🔎 Search:\n\n" +
      `https://www.google.com/search?q=${encodeURIComponent(query)}`
    );
  }


  if (command === "wikipedia") {

    if (await needInput("wikipedia Nigeria")) {
      return;
    }

    try {

      const response = await axios.get(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        encodeURIComponent(query)
      );

      return reply(
        `📚 ${response.data.title}\n\n` +
        `${response.data.extract || "No summary found."}`
      );

    } catch {
      return reply(
        "❌ Wikipedia article not found."
      );
    }
  }


  if (command === "github") {

    if (await needInput("github username")) {
      return;
    }

    try {

      const response = await axios.get(
        `https://api.github.com/users/${encodeURIComponent(query)}`
      );

      const user =
        response.data;

      return reply(
        "🐙 GITHUB\n\n" +
        `👤 ${user.login}\n` +
        `📦 Repositories: ${user.public_repos}\n` +
        `👥 Followers: ${user.followers}\n` +
        `🔗 ${user.html_url}`
      );

    } catch {
      return reply(
        "❌ GitHub user not found."
      );
    }
  }


  if (command === "npm") {

    if (await needInput("npm express")) {
      return;
    }

    try {

      const response = await axios.get(
        `https://registry.npmjs.org/${encodeURIComponent(query)}`
      );

      const data =
        response.data;

      return reply(
        "📦 NPM PACKAGE\n\n" +
        `Name: ${data.name}\n` +
        `Version: ${data["dist-tags"]?.latest || "Unknown"}\n` +
        `Description: ${data.description || "None"}`
      );

    } catch {
      return reply(
        "❌ NPM package not found."
      );
    }
  }


  if (command === "youtube") {

    if (await needInput("youtube KNOX BOT")) {
      return;
    }

    return reply(
      "▶️ YouTube Search\n\n" +
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    );
  }


  if (command === "image") {

    if (await needInput("image anime")) {
      return;
    }

    return reply(
      "🖼️ Image Search\n\n" +
      `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`
    );
  }


  if (command === "news") {

    if (await needInput("news Nigeria")) {
      return;
    }

    return reply(
      "📰 News Search\n\n" +
      `https://www.google.com/search?tbm=nws&q=${encodeURIComponent(query)}`
    );
  }


  if (command === "lyrics") {

    if (await needInput("lyrics song name")) {
      return;
    }

    return reply(
      "🎵 Lyrics Search\n\n" +
      `https://www.google.com/search?q=${encodeURIComponent(query + " lyrics")}`
    );
  }


  if (command === "define") {

    if (await needInput("define technology")) {
      return;
    }

    try {

      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query)}`
      );

      const entry =
        response.data[0];

      const meaning =
        entry.meanings?.[0]?.definitions?.[0]?.definition;

      return reply(
        `📖 ${entry.word}\n\n` +
        `${meaning || "Definition unavailable."}`
      );

    } catch {
      return reply(
        "❌ Word not found."
      );
    }
  }


  // ===============================
  // ANIME
  // ===============================

  if (command === "anime" ||
      command === "animesearch") {

    if (await needInput("anime Naruto")) {
      return;
    }

    try {

      const response = await axios.get(
        "https://api.jikan.moe/v4/anime",
        {
          params: {
            q: query,
            limit: 1
          }
        }
      );

      const anime =
        response.data.data?.[0];

      if (!anime) {
        return reply("❌ Anime not found.");
      }

      return reply(
        `🎌 ${anime.title}\n\n` +
        `⭐ Score: ${anime.score || "N/A"}\n` +
        `📺 Episodes: ${anime.episodes || "N/A"}\n` +
        `📅 Status: ${anime.status || "N/A"}`
      );

    } catch {
      return reply(
        "❌ Anime service is temporarily unavailable."
      );
    }
  }


  if (command === "character") {

    if (await needInput("character Naruto Uzumaki")) {
      return;
    }

    return reply(
      "🎭 Character search:\n\n" +
      `https://www.google.com/search?q=${encodeURIComponent(query + " anime character")}`
    );
  }


  if (command === "manga") {

    if (await needInput("manga One Piece")) {
      return;
    }

    return reply(
      "📖 Manga Search:\n\n" +
      `https://www.google.com/search?q=${encodeURIComponent(query + " manga")}`
    );
  }


  if (command === "waifu") {

    try {

      const response = await axios.get(
        "https://api.waifu.pics/sfw/waifu"
      );

      return sendImage(
        number,
        response.data.url,
        "💗 WAIFU"
      );

    } catch {
      return reply("❌ Waifu service unavailable.");
    }
  }


  if (command === "neko") {

    try {

      const response = await axios.get(
        "https://api.waifu.pics/sfw/neko"
      );

      return sendImage(
        number,
        response.data.url,
        "🐱 NEKO"
      );

    } catch {
      return reply("❌ Neko service unavailable.");
    }
  }


  if (command === "kitsune") {

    return reply(
      "🦊 Kitsune\n\n" +
      "https://www.google.com/search?tbm=isch&q=kitsune+anime"
    );
  }


  if (command === "animequote") {

    try {

      const response = await axios.get(
        "https://animechan.io/api/v1/quotes/random"
      );

      const data =
        response.data;

      return reply(
        `🎌 Anime Quote\n\n${data.quote || "Quote unavailable."}\n\n— ${data.character || "Unknown"}`
      );

    } catch {
      return reply(
        "🎌 Believe in yourself and keep moving forward."
      );
    }
  }


  if (command === "animewall") {

    return reply(
      "🖼️ Anime Wallpapers\n\n" +
      "https://www.google.com/search?tbm=isch&q=anime+wallpaper"
    );
  }


  if (command === "animememe") {

    return reply(
      "😂 Anime Memes\n\n" +
      "https://www.google.com/search?tbm=isch&q=anime+meme"
    );
  }


  // ===============================
  // GAMES
  // ===============================

  if (command === "coinflip") {

    return reply(
      Math.random() < 0.5
        ? "🪙 HEADS!"
        : "🪙 TAILS!"
    );
  }


  if (command === "dice") {

    const roll =
      Math.floor(Math.random() * 6) + 1;

    return reply(
      `🎲 You rolled: ${roll}`
    );
  }


  if (command === "8ball") {

    const answers = [
      "🎱 Yes.",
      "🎱 No.",
      "🎱 Maybe.",
      "🎱 Definitely.",
      "🎱 Ask again later.",
      "🎱 Probably not."
    ];

    return reply(
      answers[
        Math.floor(
          Math.random() * answers.length
        )
      ]
    );
  }


  if (command === "rps") {

    const choices = [
      "rock",
      "paper",
      "scissors"
    ];

    const player =
      query.toLowerCase();

    if (!choices.includes(player)) {
      return reply(
        `Usage: ${PREFIX}rps rock`
      );
    }

    const bot =
      choices[
        Math.floor(
          Math.random() * choices.length
        )
      ];

    let result;

    if (player === bot) {
      result = "🤝 DRAW!";
    } else if (
      (player === "rock" && bot === "scissors") ||
      (player === "paper" && bot === "rock") ||
      (player === "scissors" && bot === "paper")
    ) {
      result = "🏆 YOU WIN!";
    } else {
      result = "🤖 BOT WINS!";
    }

    return reply(
      `✊ You: ${player}\n` +
      `🤖 Bot: ${bot}\n\n` +
      result
    );
  }


  if (command === "guess") {

    const secret =
      Math.floor(Math.random() * 10) + 1;

    if (!args[0]) {
      return reply(
        `🎯 Guess a number from 1-10.\n` +
        `Example: ${PREFIX}guess 5`
      );
    }

    const guess =
      Number(args[0]);

    if (guess === secret) {
      return reply(
        "🎉 Correct! You guessed it!"
      );
    }

    return reply(
      `❌ Wrong! The number was ${secret}.`
    );
  }


  if (command === "quiz" ||
      command === "trivia") {

    const questions = [
      {
        q: "What is the capital of Nigeria?",
        a: "abuja"
      },
      {
        q: "How many days are in a week?",
        a: "7"
      },
      {
        q: "Which planet is known as the Red Planet?",
        a: "mars"
      },
      {
        q: "How many continents are there?",
        a: "7"
      }
    ];

    const item =
      questions[
        Math.floor(
          Math.random() * questions.length
        )
      ];

    return reply(
      `🧠 QUIZ\n\n${item.q}\n\n` +
      `Answer with: ${PREFIX}answer your_answer`
    );
  }


  if (command === "slots") {

    const symbols = [
      "🍒",
      "🍋",
      "🍉",
      "⭐",
      "💎"
    ];

    const result = [
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
      symbols[Math.floor(Math.random() * symbols.length)]
    ];

    const win =
      result[0] === result[1] &&
      result[1] === result[2];

    return reply(
      `🎰 ${result.join(" | ")}\n\n` +
      (win
        ? "🎉 JACKPOT!"
        : "😅 Try again!")
    );
  }


  if (command === "tictactoe") {

    return reply(
      "⭕ TIC TAC TOE\n\n" +
      "A full multiplayer board is not connected yet."
    );
  }


  if (command === "hangman") {

    const words = [
      "whatsapp",
      "computer",
      "nigeria",
      "android",
      "javascript"
    ];

    const word =
      words[
        Math.floor(
          Math.random() * words.length
        )
      ];

    return reply(
      "🎮 HANGMAN\n\n" +
      `Your word has ${word.length} letters.\n` +
      `Hint: ${word[0]}...`
    );
  }


  // ===============================
  // FUN
  // ===============================

  if (command === "ship" ||
      command === "compatibility") {

    if (args.length < 2) {
      return reply(
        `Usage: ${PREFIX}${command} name1 name2`
      );
    }

    const score =
      Math.floor(Math.random() * 101);

    return reply(
      `💞 ${args[0]} ❤️ ${args[1]}\n\n` +
      `Compatibility: ${score}%`
    );
  }


  if (command === "rate") {

    if (await needInput("rate my setup")) {
      return;
    }

    const score =
      Math.floor(Math.random() * 11);

    return reply(
      `⭐ Rating for "${query}": ${score}/10`
    );
  }


  if (command === "roast") {

    if (await needInput("roast me")) {
      return;
    }

    return reply(
      `🔥 ROAST\n\n` +
      `${query}, even your Wi-Fi needs motivation to connect. 😂`
    );
  }


  if (command === "compliment") {

    if (await needInput("compliment me")) {
      return;
    }

    return reply(
      `✨ ${query}\n\n` +
      "You're doing great. Keep pushing forward! 👑"
    );
  }


  if (command === "pick" ||
      command === "choose") {

    if (args.length < 2) {
      return reply(
        `Usage: ${PREFIX}${command} red blue green`
      );
    }

    const selected =
      args[
        Math.floor(
          Math.random() * args.length
        )
      ];

    return reply(
      `🎯 I choose: ${selected}`
    );
  }


  if (command === "truth") {

    const truths = [
      "What is your biggest goal?",
      "What is something you are proud of?",
      "What is your favorite game?",
      "What is one thing you want to learn?"
    ];

    return reply(
      `🧐 TRUTH\n\n${
        truths[
          Math.floor(
            Math.random() * truths.length
          )
        ]
      }`
    );
  }


  if (command === "dare") {

    const dares = [
      "Send a funny emoji.",
      "Say something nice about a friend.",
      "Change your WhatsApp status for a few minutes.",
      "Tell the group your favorite game."
    ];

    return reply(
      `😈 DARE\n\n${
        dares[
          Math.floor(
            Math.random() * dares.length
          )
        ]
      }`
    );
  }


  if (command === "wouldyourather") {

    const questions = [
      "Would you rather have unlimited money or unlimited knowledge?",
      "Would you rather travel the world or live in your dream city?",
      "Would you rather be famous or completely private?"
    ];

    return reply(
      `🤔 WOULD YOU RATHER\n\n${
        questions[
          Math.floor(
            Math.random() * questions.length
          )
        ]
      }`
    );
  }


  // ===============================
  // TOOLS
  // ============


  // ===============================
  // MENU
  // ===============================

  if (
    command === "menu" ||
    command === "help" ||
    command === "commands"
  ) {

    const menu =
      buildMenu();

    return sendImage(
      number,
      MENU_IMAGE_URL,
      menu
    );

  }


  // ===============================
  // OWNER-ONLY COMMANDS
  // ===============================

  const ownerCommands = [

    "restart",
    "broadcast",
    "setmenu",
    "settings",
    "shutdown"

  ];


  if (
    ownerCommands.includes(command) &&
    !isOwner
  ) {

    return sendMessage(

      number,

      "⛔ ACCESS DENIED\n\n" +
      "👑 This command is only available to the KNOX BOT owner."

    );

  }


  // ===============================
  // PING
  // ===============================

  if (command === "ping") {

    return sendMessage(

      number,

      "🏓 Pong!\n\n" +
      "🤖 KNOX BOT is online."

    );

  }


  // ===============================
  // ALIVE
  // ===============================

  if (command === "alive") {

    return sendMessage(

      number,

      "╭━━〔 👑 KNOX BOT 〕━━╮\n" +
      "┃ 🟢 Status: ONLINE\n" +
      "┃ ⚡ Bot: Active\n" +
      `┃ 👤 Owner: ${OWNER}\n` +
      "╰━━━━━━━━━━━━━━━━━━╯"

    );

  }


  // ===============================
  // BOT
  // ===============================

  if (command === "bot") {

    return sendMessage(

      number,

      "🤖 KNOX BOT\n\n" +
      `👑 Owner: ${OWNER}\n` +
      "⚡ Powered by Evolution API\n" +
      `📚 Commands: ${commands.length}`

    );

  }


  // ===============================
  // OWNER
  // ===============================

  if (
    command === "owner" ||
    command === "creator"
  ) {

    return sendMessage(

      number,

      `👑 Owner: ${OWNER}`

    );

  }


  // ===============================
  // INFO
  // ===============================

  if (
    command === "info" ||
    command === "botinfo"
  ) {

    return sendMessage(

      number,

      "╭━━〔 🤖 BOT INFO 〕━━╮\n" +
      `┃ 👑 Owner: ${OWNER}\n` +
      "┃ 🤖 Name: KNOX BOT\n" +
      `┃ ⚡ Prefix: ${PREFIX}\n` +
      `┃ 📚 Commands: ${commands.length}\n` +
      "┃ 🟢 Status: Online\n" +
      "╰━━━━━━━━━━━━━━━━━━╯"

    );

  }


  // ===============================
  // UPTIME
  // ===============================

  if (command === "uptime") {

    const seconds =
      Math.floor(process.uptime());

    const days =
      Math.floor(seconds / 86400);

    const hours =
      Math.floor(
        (seconds % 86400) / 3600
      );

    const minutes =
      Math.floor(
        (seconds % 3600) / 60
      );

    const secs =
      seconds % 60;


    return sendMessage(

      number,

      "⏱️ KNOX BOT UPTIME\n\n" +
      `${days}d ${hours}h ${minutes}m ${secs}s`

    );

  }


  // ===============================
  // STATUS
  // ===============================

  if (command === "status") {

    return sendMessage(

      number,

      "🟢 KNOX BOT STATUS\n\n" +
      "🤖 Bot: Online\n" +
      "🔌 API: Connected\n" +
      `📚 Commands: ${commands.length}`

    );

  }


  // ===============================
  // ABOUT
  // ===============================

  if (command === "about") {

    return sendMessage(

      number,

      "👑 KNOX BOT\n\n" +
      "A WhatsApp bot created for Knox The Great.\n\n" +
      `Type ${PREFIX}menu to view the commands.`

    );

  }


  // ===============================
  // ECHO / SAY
  // ===============================

  if (
    command === "echo" ||
    command === "say"
  ) {

    if (!args.length) {

      return sendMessage(

        number,

        `Usage: ${PREFIX}${command} hello`

      );

    }

    return sendMessage(
      number,
      args.join(" ")
    );

  }


  // ===============================
  // UNKNOWN COMMAND
  // ===============================

  return sendMessage(

    number,

    `❌ Unknown command: ${PREFIX}${command}\n\n` +
    `Type ${PREFIX}menu to see available commands.`

  );

}


// ===============================
// EVOLUTION API WEBHOOK
// ===============================

app.post(
  "/webhook/evolution",
  async (req, res) => {

    // Respond immediately
    res.sendStatus(200);

    try {

      const data = req.body || {};

      console.log("Webhook received");

      const eventData =
        data?.data ||
        data?.body?.data ||
        data?.body ||
        data;

      const key =
        eventData?.key ||
        eventData?.message?.key ||
        {};

      const message =
        eventData?.message ||
        eventData?.data?.message ||
        {};

      const text =
        getMessageText(message);

      // Allow commands from the connected WhatsApp account.
      // This fixes the problem where Evolution marks your
      // own messages as fromMe: true.
      if (
        key.fromMe === true &&
        !text.startsWith(PREFIX)
      ) {
        console.log(
          "Ignoring non-command message sent by bot account."
        );
        return;
      }

      // Get sender
      const remoteJid =
        key.senderPn ||
        key.remoteJid ||
        key.participant ||
        eventData?.remoteJid ||
        "";

      if (!remoteJid) {
        console.log("No sender number found.");
        return;
      }

      // Clean WhatsApp number
      const number = String(remoteJid)
        .replace(/@s\.whatsapp\.net$/i, "")
        .replace(/@g\.us$/i, "")
        .replace(/@lid$/i, "")
        .split(":")[0]
        .replace(/\D/g, "");

      if (!text) {
        console.log("No text message found.");
        return;
      }

      console.log(
        `Incoming message from ${number}: ${text}`
      );

      const normalizedOwner =
        String(OWNER_NUMBER)
          .replace(/\D/g, "");

      const isOwner =
        number === normalizedOwner;

      console.log(
        `Owner check: ${isOwner}`
      );

      await handleCommand(
        number,
        text
      );

    } catch (error) {

      console.error(
        "Webhook error:",
        error.response?.data ||
        error.message ||
        error
      );

    }

  }
);


// ===============================
// START BOT
// ===============================

app.listen(
  PORT,
  () => {

    console.log(
      "╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮"
    );

    console.log(
      "┃      👑 KNOX BOT         ┃"
    );

    console.log(
      "╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯"
    );

    console.log(
      `🚀 Server running on port ${PORT}`
    );

    console.log(
      `📚 Commands loaded: ${commands.length}`
    );

    console.log(
      `⚡ Prefix: ${PREFIX}`
    );

    console.log(
      `👑 Owner number: ${OWNER_NUMBER}`
    );

  }
);
