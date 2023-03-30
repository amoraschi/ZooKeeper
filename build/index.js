import env from 'dotenv';
import { Client } from 'discord.js';
import { getCommands, log } from './utils/utils.js';
import { loadCommands } from './commands.js';
import { connectDB } from './database.js';
env.config();
async function startZooKeeper() {
    await connectDB();
    const client = new Client({ intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'] });
    const commands = await getCommands();
    client.once('ready', async () => {
        log('Discord bot started');
        await loadCommands(commands);
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand())
                return;
            const command = commands.find(command => command.name === interaction.commandName);
            if (command == null)
                return;
            try {
                await command.execute(interaction);
            }
            catch (error) {
                log(error, 'ERROR');
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            }
        });
        client.on('messageCreate', async (message) => {
            if (message.content.match(/sel(l)?(.+)?(bm|binmaster|bin|binm)/i) != null) {
                await message.react('🇳');
                await message.react('🇴');
            }
        });
    });
    client.login(process.env.BOT_TOKEN);
}
startZooKeeper();
