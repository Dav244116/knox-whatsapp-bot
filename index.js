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
// Example: 2348012345678
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

async function handleCommand(
  number,
  text
) {

  if (!text.startsWith(PREFIX)) {
    return;
  }

  const input =
    text.slice(PREFIX.length).trim();

  if (!input) {
    return;
  }

  const parts =
    input.split(/\s+/);

  const command =
    parts.shift().toLowerCase();

  const args = parts;

  // Check if the person is the owner
  const isOwner =
    number === OWNER_NUMBER;


  console.log(
    `Command: ${PREFIX}${command}`
  );

  console.log(
    `Sender: ${number}`
  );

  console.log(
    `Owner: ${isOwner}`
  );


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

      const data = req.body;

      console.log(
        "Webhook received"
      );


      const eventData =
        data?.data ||
        data?.body?.data ||
        data;


      const key =
        eventData?.key || {};


      const message =
        eventData?.message || {};


      // Ignore bot's own messages
      if (
        key.fromMe === true
      ) {

        return;

      }


      const remoteJid =
        key.remoteJid ||
        eventData?.remoteJid ||
        "";


      if (!remoteJid) {

        console.log(
          "No remoteJid found."
        );

        return;

      }


      const number =
        remoteJid
          .replace(
            "@s.whatsapp.net",
            ""
          )
          .replace(
            "@g.us",
            ""
          );


      const text =
        getMessageText(message);


      if (!text) {
        return;
      }


      console.log(
        `Incoming message from ${number}: ${text}`
      );


      await handleCommand(
        number,
        text
      );


    } catch (error) {

      console.error(
        "Webhook error:",
        error.response?.data ||
        error.message
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
