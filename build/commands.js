import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { log } from './utils/utils.js';
async function loadCommands(commands) {
    // @ts-ignore
    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID ?? '', process.env.GUILD_ID ?? ''), { body: commands });
    log('Successfully reloaded application (/) commands.');
}
export { loadCommands };
