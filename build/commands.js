import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { log } from './utils/utils.js';
async function loadCommands(commands) {
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN ?? '');
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID ?? '', process.env.GUILD_ID ?? ''), { body: commands });
    log('Successfully reloaded application (/) commands.');
}
export { loadCommands };