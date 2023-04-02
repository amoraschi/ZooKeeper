import env from 'dotenv'
import { Client, GuildMember, TextChannel } from 'discord.js'
import { getCommands, isUserAllowed, log } from './utils/utils.js'
import { loadCommands } from './commands.js'
import { connectDB, getDoc } from './database.js'

env.config()

async function startZooKeeper (): Promise<void> {
  await connectDB()
  const client = new Client({ intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'] })
  const commands = await getCommands()

  client.once('ready', async () => {
    log('Discord bot started')
    await loadCommands(commands)

    const channel = client.channels.cache.find((channel: any) => channel.id === process.env.GENERAL_ID)

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return
      const command = commands.find(command => command.name === interaction.commandName)
      if (command == null) return

      if (!isUserAllowed(interaction.member as GuildMember)) {
        await interaction.reply({
          content: 'You don\'t have permission to use this command',
          ephemeral: true
        })

        return
      }

      try {
        await command.execute(interaction)
      } catch (error) {
        log(error, 'ERROR')
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true
        })
      }
    })

    client.on('messageCreate', async (message) => {
      if (message.content.match(/sel(l)?(.+)?(bm|binmaster|bin|binm)?(\s)?key/i) != null) {
        await message.react('🇳')
        await message.react('🇴')
      }
    js
      if (message.member.roles.cache.find(role => role.id === process.env.MONKI_ROLE_ID)) {
        message.reply('<@&979117682806902794>').then(msg => {
          setTimeout(() => msg.delete(), 200)
        })
        .catch(console.log)
      }
    })

    client.on('guildMemberAdd', async (member) => {
      const info = await getDoc(member.user.id)
      if (info != null) {
        const role = member.guild.roles.cache.find((role: any) => role.id === process.env.MONKI_ROLE_ID)
        if (role != null && channel != null) {
          await member.roles.add(role)
          await (channel as TextChannel).send(`Welcome back to the server <@${member.user.id}>! You have been given the monki 🐒 role again! Enjoy monking around! 🐵 Hee-Hee-Hoo-Hoo! 🐵`)
        }
      }
    })
  })

  client.login(process.env.BOT_TOKEN)
}

startZooKeeper()
