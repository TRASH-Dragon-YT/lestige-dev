<div align="center">
  <br />
  <p>
    <a href="https://discord.gg/YM9KxHpcWb"><img src="https://cdn.discordapp.com/attachments/893649196169691196/893900788588490782/Discordly.png" width="546" alt="discordly" /></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/YM9KxHpcWb"><img src="https://img.shields.io/discord/863339994000654346?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/discordly"><img src="https://img.shields.io/npm/v/discordly.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/discordly"><img src="https://img.shields.io/npm/dt/discordly.svg?maxAge=3600" alt="NPM downloads" /></a>
  </p>
</div>


## Important
> Discordly is still in development so it's only able to do some things. <br>
> Discordly also supports all versions of nodejs that are above 10.x.

## Update



## About

discordly is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the
[Discord API](https://discord.com/developers/docs/intro).

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Discord API



## Example usage


```js
const {Client, intents} = require('discordly')
const client = new Client({intents: [intents.Flags.GUILDS, intents.Flags.GUILD_MESSAGES, intents.Flags.GUILD_MESSAGE_REACTIONS]})

client.on('ready', () => {
  console.log(`${client.tag} is ready.`)
})

client.on('message', message => {
    if(message.author.bot) return;

    if(message.content == '!help'){
      /*  const embed = new Discordly.RichEmbed()  - Coming soon.*/
      message.channel.say('I am here to help :D')
    }
})

client.login('Your secret token.')
//If you use replit.com, instead of doing 'token', do process.env.token.
```