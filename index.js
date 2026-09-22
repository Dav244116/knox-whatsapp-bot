const express = require("express");
const axios = require("axios");

const { commands, categories, total } = require("./commands/commands300");

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
  res.json({
    status: "ok",
    bot: "Knox WhatsApp Bot",
    commands: total
  });
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

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function buildMenu() {
  let menu = `╭━━━〔 👑 KNOX BOT 〕━━━╮
┃
┃ ⚡ ${total} COMMANDS AVAILABLE
┃`;

  for (const [category, list] of Object.entries(categories)) {
    menu += `\n┃ 🔹 ${category.toUpperCase()}\n`;

    for (const command of list) {
      menu += `┃ • .${command}\n`;
    }
  }

  menu += `┃
╰━━━━━━━━━━━━━━━━━━━━╯`;

  return menu;
}

app.post("/webhook/evolution", async (req, res) => {
  res.sendStatus(200);

  try {
    const data = req.body;

    const message = data?.data?.message;
    const key = data?.data?.key;

    if (!message || !key) return;

    // Ignore messages sent by the bot itself
    if (key.fromMe) return;

    const number = key.remoteJid?.replace("@s.whatsapp.net", "");

    if (!number) return;

    const text =
      message.conversation ||
      message.extendedTextMessage?.text ||
      "";

    const input = text.trim();

    if (!input.startsWith(".")) return;

    const parts = input.split(/\s+/);

    const commandName = parts[0]
      .slice(1)
      .toLowerCase();

    const args = parts.slice(1);

    // MENU
    if (commandName === "menu" || commandName === "help") {
      await sendMessage(number, buildMenu());
      return;
    }

    // DICE
    if (commandName === "dice") {
      const roll = Math.floor(Math.random() * 6) + 1;

      await sendMessage(
        number,
        `🎲 You rolled: ${roll}`
      );

      return;
    }

    // COINFLIP
    if (commandName === "coinflip") {
      await sendMessage(
        number,
        Math.random() < 0.5
          ? "🪙 Heads!"
          : "🪙 Tails!"
      );

      return;
    }

    // RANDOM
    if (commandName === "random") {
      await sendMessage(
        number,
        `🎲 Random number: ${Math.floor(Math.random() * 100) + 1}`
      );

      return;
    }

    // CHOOSE
    if (commandName === "choose") {
      if (args.length < 2) {
        await sendMessage(
          number,
          "🎯 Example:\n.choose football gaming"
        );
        return;
      }

      await sendMessage(
        number,
        `🎯 I choose: ${randomItem(args)}`
      );

      return;
    }

    // NUMBER
    if (commandName === "number") {
      const min = Number(args[0]);
      const max = Number(args[1]);

      if (
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min > max
      ) {
        await sendMessage(
          number,
          "🔢 Example:\n.number 1 100"
        );
        return;
      }

      const result =
        Math.floor(Math.random() * (max - min + 1)) + min;

      await sendMessage(
        number,
        `🔢 Your number is: ${result}`
      );

      return;
    }

    // SAY / REPEAT
    if (
      commandName === "say" ||
      commandName === "repeat"
    ) {
      if (!args.length) {
        await sendMessage(
          number,
          "✍️ Example:\n.say Hello everyone!"
        );
        return;
      }

      await sendMessage(
        number,
        args.join(" ")
      );

      return;
    }

    // CALCULATOR
    if (commandName === "calc") {
      const expression = args.join(" ");

      if (
        !expression ||
        !/^[0-9+\-*/().%\s]+$/.test(expression)
      ) {
        await sendMessage(
          number,
          "🧮 Example:\n.calc 25*4"
        );
        return;
      }

      try {
        const result = Function(
          `"use strict"; return (${expression})`
        )();

        await sendMessage(
          number,
          `🧮 Answer: ${result}`
        );
      } catch {
        await sendMessage(
          number,
          "❌ Invalid calculation."
        );
      }

      return;
    }

    // TIME
    if (commandName === "time") {
      await sendMessage(
        number,
        `🕐 Server time: ${new Date().toLocaleTimeString()}`
      );

      return;
    }

    // DATE
    if (commandName === "date") {
      await sendMessage(
        number,
        `📅 Server date: ${new Date().toLocaleDateString()}`
      );

      return;
    }

    // ID
    if (commandName === "id") {
      await sendMessage(
        number,
        `🆔 Your WhatsApp ID:\n${number}`
      );

      return;
    }

    // UNKNOWN COMMAND
    if (!commands[commandName]) {
      await sendMessage(
        number,
        `❌ Unknown command: .${commandName}\n\nType .menu to see all ${total} commands.`
      );

      return;
    }

    // NORMAL COMMAND
    await sendMessage(
      number,
      commands[commandName].response
    );

  } catch (error) {
    console.error(
      "Bot error:",
      error.response?.data || error.message
    );
  }
});

app.listen(PORT, () => {
  console.log(
    `Knox Bot running on port ${PORT} with ${total} commands`
  );
});
