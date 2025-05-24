require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const mongoose = require('mongoose');
const logMessage = require('./messageLogger'); // Este debe exportar una función

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('📦 Conectado a MongoDB');
}).catch((err) => {
  console.error('❌ Error al conectar a MongoDB:', err);
});

// Evento de mensaje
client.on('messageCreate', logMessage);

// Evento al conectar el bot
client.once('ready', () => {
    console.log(`🤖 Bot conectado como ${client.user.tag}`);
  });

// Login del bot
client.login(process.env.DISCORD_TOKEN);
