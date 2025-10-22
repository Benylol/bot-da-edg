// ====== Imports ======
const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");

// ====== Create Discord client ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// ====== Log when bot is online ======
client.once("ready", () => {
  console.log(`✅ Bot online as ${client.user.tag}`);
});

// ====== TicketTool Category IDs ======
const REGEAR_CATEGORY_ID = "1430080995733798983";
const RECRUIT_CATEGORY_ID = "1355629033496248552";

// ====== When a new channel is created ======
client.on("channelCreate", async (channel) => {
  try {
    // Only act on normal text channels inside a guild
    if (!channel.guild || channel.type !== 0) return;

    // 🛡️ REGEAR Ticket
    if (channel.parentId === REGEAR_CATEGORY_ID) {
      await channel.send({
        content:
          `***Seja Bem-vindo ao sistema de Re-Gear da Edgerunners!***\n` +
          `*Por favor, Crie um Ticket abaixo com as seguintes informações:*\n` +
          `> ***1 - BUILD (Ex; DPS, BRUXO, HEALER e etc...)***\n` +
          `> ***2 - Data da morte (Max de 1 dia apos a morte)***\n` +
          `> ***3 - Print da morte no perfil***`
      });
      console.log(`🛡️ Regear ticket detected: ${channel.name}`);
    }

    // 📜 RECRUIT / REGISTER Ticket
    else if (channel.parentId === RECRUIT_CATEGORY_ID) {
      await channel.send({
        content:
          `📜 **Formulário de Registro** 📜\n\n` +
          `🏴‍☠️ **EdgeRunners** 🏴‍☠️\n\n` +
          `Seja bem-vindo ao processo de inscrição da Edgerunners!\n` +
          `Para garantir que você se encaixa no perfil da guilda, preencha o formulário abaixo com atenção e envie-o no ticket \n\n` +
          `📝 **Informações Básicas**\n` +
          `🔹 Nick no Albion:\n` +
          `🔹 ID do Discord:\n\n` +
          `⚔️ **Experiência no Jogo**\n` +
          `🔹 Fama Total:\n` +
          `🔹 Joga no PC ou mobile?\n` +
          `⏳ Disponibilidade/Horários durante a semana:\n\n` +
          `🎯 **Estilo de Jogo**\n` +
          `🔹 Qual seu foco principal no jogo?\n` +
          `🔹 Possui experiência em ZVZ?\n` +
          `🔹 Quais classes você usa com mais frequência?\n\n` +
          `🛡️ **Sobre a Guilda**\n` +
          `🔹 Já fez parte de alguma guilda? Se sim, qual?\n` +
          `🔹 Como você conheceu à guilda?\n\n` +
          `📢 **Informações Extras**\n\n` +
          `Copie o formulário e envie no chat!`
      });
      console.log(`📜 Recruit ticket detected: ${channel.name}`);
    }
  } catch (err) {
    console.error("Error handling new channel:", err);
  }
});
// ====== Respond when bot is pinged ======
client.on("messageCreate", async (message) => {
  // Ignore messages from bots (including itself)
  if (message.author.bot) return;

  // Check if the bot was mentioned
  if (message.mentions.has(client.user)) {
    await message.reply({
      content: "👋 Opa! Edgerunners melhor guilda do Albion, mariz melhor player! ⚔️",
    });
  }
});

// ====== Keep-alive Express server for Render ======
const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(3000, () => console.log("🌐 Keep-alive web server running on port 3000"));

// ====== Login ======
client.login(process.env.DISCORD_TOKEN);
