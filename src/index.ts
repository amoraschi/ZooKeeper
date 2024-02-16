import env from 'dotenv'
import cron from 'node-cron'
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
    log(`Discord bot started as ${client.user?.tag}`)

    const channel = client.channels.cache.find((channel: any) => channel.id === process.env.GENERAL_ID)
    const writeBotChannel = client.channels.cache.find((channel: any) => channel.id === process.env.WRITE_BOT_CHANNEL_ID)
    const moderatedChannel = client.channels.cache.find((channel: any) => channel.id === process.env.MODERATED_CHANNEL_ID)
    const guild = client.guilds.cache.get(process.env.GUILD_ID as string)

    await loadCommands(commands)
    await guild?.members.fetch()

    cron.schedule('0 0 * * *', async () => {
      log('Fetching members')
      await guild?.members.fetch()
    })

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
      if (message.channel.id === writeBotChannel?.id) {
        let savedTag = message.author.tag

        await (moderatedChannel as TextChannel).send(`\`${savedTag}\` wrote in #write-here-if-bot: ${message.content}`).catch(() => {
          log(`Failed to send message from \`${savedTag}\` in #write-here-if-bot to #moderated`, 'ERROR')
        })

        await message.delete().catch(() => {
          log(`Failed to delete message from \`${savedTag}\` in #write-here-if-bot`, 'ERROR')
        })

        await message.member?.ban({
          reason: 'Spam bot that writes in #write-here-if-bot'
        }).then(async () => {
          await (channel as TextChannel).send(`Bye bye \`${savedTag ?? '(I don\'t know who I banned)'}\`! 👋 Next time don't talk in <#${writeBotChannel?.id}>!`)
          log(`Banned \`${savedTag}\` for writing in #write-here-if-bot`)
        }, () => {
          log(`Failed to ban \`${savedTag}\` for writing in #write-here-if-bot`, 'ERROR')
        })
      }
    })

    client.on('guildMemberAdd', async (member) => {
      const info = await getDoc(member.user.id)
      if (info != null) {
        const role = member.guild.roles.cache.find((role: any) => role.id === process.env.MONKI_ROLE_ID)
        if (role != null && channel != null) {
          await member.roles.add(role)
          // await (channel as TextChannel).send(`Welcome back to the server <@${member.user.id}>! You have been given the monki 🐒 role again! Enjoy monking around! 🐵 Hee-Hee-Hoo-Hoo! 🐵`)
        }
      }
    })
  })

  client.login(process.env.BOT_TOKEN)
}

startZooKeeper()
