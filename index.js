const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

const EVOLUTION_API_URL = process.env.EVOLUTION_API_URL;
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY;
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE;

app.get("/", (req, res) => {
  res.send("Knox WhatsApp Bot is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

async function sendMessage(number, text) {
  await axios.post(
    `${EVOLUTION_API_URL}/message/sendText/${EVOLUTION_INSTANCE}`,
    {
      number,
      text
    },
    {
      headers: {
        apikey: EVOLUTION_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );
}

app.post("/webhook/evolution", async (req, res) => {
  res.sendStatus(200);

  try {
    const data = req.body;

    const message = data?.data?.message;
    const key = data?.data?.key;

    if (!message || !key) return;
    if (key.fromMe) return;

    const number = key.remoteJid?.replace("@s.whatsapp.net", "");
    if (!number) return;

    const text =
      message.conversation ||
      message.extendedTextMessage?.text ||
      "";

    const command = text.trim().toLowerCase();

    if (command === ".ping") {
      await sendMessage(number, "🏓 Pong! Knox Bot is online 🚀");
    }

    if (command === ".menu") {
      await sendMessage(
        number,
        `╭━━━〔 KNOX BOT 〕━━━╮
┃
┃ 👑 .menu
┃ 🏓 .ping
┃ ℹ️ .help
┃ 👤 .owner
┃
╰━━━━━━━━━━━━━━━━━━╯`
      );
    }

    if (command === ".help") {
      await sendMessage(
        number,
        "🤖 Knox Bot Help\n\nUse .menu to see available commands."
      );
    }

    if (command === ".owner") {
      await sendMessage(
        number,
        "👑 Owner: Knox The Great"
      );
    }
  } catch (error) {
    console.error(
      "Bot error:",
      error.response?.data || error.message
    );
  }
});

app.listen(PORT, () => {
  console.log(`Knox Bot running on port ${PORT}`);
});
