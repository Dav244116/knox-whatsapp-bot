const express = require("express");
const axios = require("axios");

const general = require("./commands/general");
const fun = require("./commands/fun");
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
      await sendMessage(number, general.ping);
    }

    else if (command === ".alive") {
      await sendMessage(number, general.alive);
    }

    else if (command === ".help") {
      await sendMessage(number, general.help);
    }

    else if (command === ".owner") {
      await sendMessage(number, general.owner);
    }

    else if (command === ".botinfo") {
      await sendMessage(number, general.botinfo);
    }

    else if (command === ".menu") {
      await sendMessage(number, general.menu);
    }
else if (command === ".joke") {
  await sendMessage(number, fun.joke);
}

else if (command === ".fact") {
  await sendMessage(number, fun.fact);
}

else if (command === ".quote") {
  await sendMessage(number, fun.quote);
}

else if (command === ".8ball") {
  await sendMessage(number, fun.eightball);
}

else if (command === ".dice") {
  await sendMessage(
    number,
    `🎲 You rolled: ${Math.floor(Math.random() * 6) + 1}`
  );
}

else if (command === ".coinflip") {
  await sendMessage(
    number,
    Math.random() < 0.5 ? "🪙 Heads!" : "🪙 Tails!"
  );
}

else if (command === ".rps") {
  await sendMessage(number, fun.rps);
}

else if (command === ".truth") {
  await sendMessage(number, fun.truth);
}

else if (command === ".dare") {
  await sendMessage(number, fun.dare);
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
