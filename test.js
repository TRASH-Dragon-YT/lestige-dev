const { Client, Intents, DiscordEmbed, DiscordButton, SlashCommands } = require('./module/index')
require('dotenv').config()
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] })
const slashCommands = new SlashCommands()
var data;
client.on('ready', async () => {
  console.log(`${client.me.tag} is ready.`)

  slashCommands.put('Test', {
    description: "Official Test"
  })
  slashCommands.Addoption('Test', 'Hi!', 'string', false)
/*
  slashCommands.put('test2', {
    description: "Official Test2"
  })
  */
})


client.on('message', message => {
  if (message.author.bot) return;

  if (message.content == ';l') {
   const menu = new DiscordButton()
   .setId('Lol')
   .setName('lINK TO DISCORD')
   .setStyle('Primary')
   message.channel.send({buttons: [menu]})
  }
})

client.on('interactionCreate', (interaction) => {

  if(interaction.isCommand()) {
    console.log(interaction.name)
    if(interaction.name == "test") {
      interaction.reply({ content: "Only worked on the command test!" })
    } else {
      interaction.reply({ content: "Test" })
    }
  }  if(interaction.isButton()) {
    console.log(interaction.name)
    interaction.reply({ content: interaction.name })
  }
})

client.login(process.env.token)