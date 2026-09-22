const express = require("express");
const axios = require("axios");
const { categories, commands } = require("./Commands300");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.BOT_PREFIX || ".";
const OWNER = process.env.BOT_OWNER || "Knox The Great";

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE;

// ===============================
// HOME
// ===============================

app.get("/", (req, res) => {
  res.send("Knox WhatsApp Bot is running 🚀");
});

// ===============================
// HEALTH CHECK
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
// SEND WHATSAPP MESSAGE
// ===============================

async function sendMessage(number, text) {
  if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY || !EVOLUTION_INSTANCE) {
    console.error("Evolution API environment variables are missing.");
    return;
  }

  const url =
    `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`;

  try {
    await axios.post(
      url,
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

  menu += "╭━━━〔 👑 KNOX BOT 〕━━━╮\n";
  menu += "┃\n";
  menu += `┃ 👤 Owner : ${OWNER}\n`;
  menu += "┃ 🤖 Bot   : KNOX BOT\n";
  menu += `┃ ⚡ Prefix: ${PREFIX}\n`;
  menu += `┃ 📚 Total : ${commands.length} Commands\n`;
  menu += "┃\n";
  menu += "╰━━━━━━━━━━━━━━━━━━━━╯\n\n";

  for (const [category, list] of Object.entries(categories)) {
    menu += `╭━━〔 ${category.toUpperCase()} 〕━━╮\n`;

    for (const command of list) {
      menu += `┃ ${PREFIX}${command}\n`;
    }

    menu += "╰━━━━━━━━━━━━━━━━━━━━╯\n\n";
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
  const args = parts;

  console.log(`Command: ${PREFIX}${command}`);

  switch (command) {
    case "menu":
    case "help":
    case "commands":
      return sendMessage(number, buildMenu());

    case "ping":
      return sendMessage(number, "🏓 Pong!\n\nKNOX BOT is online.");

    case "alive":
      return sendMessage(
        number,
        "╭━━〔 👑 KNOX BOT 〕━━╮\n" +
        "┃ 🟢 Status: ONLINE\n" +
        "┃ ⚡ Bot: Active\n" +
        "┃ 👤 Owner: Knox The Great\n" +
        "╰━━━━━━━━━━━━━━━━━━╯"
      );

    case "bot":
      return sendMessage(
        number,
        "🤖 KNOX BOT\n\n" +
        `👑 Owner: ${OWNER}\n` +
        "⚡ Powered by Evolution API\n" +
        `📚 Commands: ${commands.length}`
      );

    case "owner":
    case "creator":
      return sendMessage(number, `👑 Owner: ${OWNER}`);

    case "info":
    case "botinfo":
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

    case "uptime": {
      const seconds = Math.floor(process.uptime());

      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      return sendMessage(
        number,
        `⏱️ KNOX BOT Uptime\n\n${days}d ${hours}h ${minutes}m ${secs}s`
      );
    }

    case "status":
      return sendMessage(
        number,
        "🟢 KNOX BOT STATUS\n\n" +
        "Bot: Online\n" +
        "API: Connected\n" +
        `Commands: ${commands.length}`
      );

    case "about":
      return sendMessage(
        number,
        "👑 KNOX BOT\n\n" +
        "A WhatsApp bot created for Knox The Great.\n\n" +
        "Type .menu to view the commands."
      );

    case "echo":
    case "say":
      if (!args.length) {
        return sendMessage(number, `Usage: ${PREFIX}${command} hello`);
      }

      return sendMessage(number, args.join(" "));

    default:
      return sendMessage(
        number,
        `❌ Unknown command: ${PREFIX}${command}\n\n` +
        `Type ${PREFIX}menu to see available commands.`
      );
  }
}

// ===============================
// EVOLUTION API WEBHOOK
// ===============================

app.post("/webhook/evolution", async (req, res) => {
  // Respond immediately so Evolution API does not retry.
  res.sendStatus(200);

  try {
    const data = req.body;

    console.log("Webhook received");

    const eventData = data?.data || data?.body?.data || data;

    const key = eventData?.key || {};
    const message = eventData?.message || {};

    // Ignore messages sent by the bot itself.
    if (key.fromMe === true) {
      return;
    }

    const remoteJid =
      key.remoteJid ||
      eventData?.remoteJid ||
      "";

    if (!remoteJid) {
      console.log("No remoteJid found.");
      return;
    }

    // Remove WhatsApp suffix.
    const number = remoteJid
      .replace("@s.whatsapp.net", "")
      .replace("@g.us", "");

    const text = getMessageText(message);

    if (!text) {
      return;
    }

    console.log(`Incoming message from ${number}: ${text}`);

    await handleCommand(number, text);

  } catch (error) {
    console.error(
      "Webhook error:",
      error.response?.data || error.message
    );
  }
});

// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
  console.log("╭━━━━━━━━━━━━━━━━━━━━━━━━━━╮");
  console.log("┃      👑 KNOX BOT         ┃");
  console.log("╰━━━━━━━━━━━━━━━━━━━━━━━━━━╯");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Commands loaded: ${commands.length}`);
  console.log(`⚡ Prefix: ${PREFIX}`);
});
