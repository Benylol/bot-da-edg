const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const TOKEN = process.env.DISCORD_TOKEN;


const ticketMessage = `
📜 **Formulário de Registro** 📜 🏴‍☠️ **EdgeRunners** 🏴‍☠️

Seja bem-vindo ao processo de inscrição da Edgerunners! 
Para garantir que você se encaixa no perfil da guilda, preencha o formulário abaixo com atenção e envie-o no ticket.

📝 **Informações Básicas**
🔹 Nick no Albion:  
🔹 ID do Discord:  

⚔️ **Experiência no Jogo**  
🔹 Fama Total:  
🔹 Joga no PC ou mobile?  
⏳ Disponibilidade/Horários durante a semana:  

🎯 **Estilo de Jogo**  
🔹 Qual seu foco principal no jogo?  
🔹 Possui experiência em ZVZ?  
🔹 Quais classes você usa com mais frequência?  

🛡️ **Sobre a Guilda**  
🔹 Já fez parte de alguma guilda? Se sim, qual?  
🔹 Como você conheceu à guilda?  

📢 **Informações Extras**  
Copie o formulário e envie-o neste chat.
`;

client.on('ready', () => {
  console.log(`✅ Bot online as ${client.user.tag}`);
});

client.on('channelCreate', async (channel) => {
  if (channel.name.startsWith('ticket-')) {
    try {
      await channel.send(ticketMessage);
      console.log(`📨 Sent form to ${channel.name}`);
    } catch (err) {
      console.error(`Failed to send message in ${channel.name}`, err);
    }
  }
});

client.login(TOKEN);
// --- keep Render from timing out ---
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(3000, () => console.log("✅ Keep-alive web server running on port 3000"));
