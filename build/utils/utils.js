import { readdirSync } from 'fs';
<<<<<<< HEAD
import { PermissionsBitField } from 'discord.js';
=======
import { PermissionsBitField } from "discord.js";
>>>>>>> fb0ffd37ce865e8b5a0f67a71559a1f3a66403f2
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    purple: '\x1b[35m',
    gray: '\x1b[90m',
    reset: '\x1b[0m'
};
function log(message, prefix = 'LOG') {
    console.log(`[${new Date().toLocaleString()}] ${getColor(prefix)}[${prefix}]${getColor()} ${message}`);
}
function getColor(prefix = '') {
    switch (prefix) {
        case 'LOG':
            return colors.blue;
        case 'ERROR':
            return colors.red;
        case 'SERVER':
            return colors.yellow;
        case 'CHAT':
            return colors.green;
        case 'PING':
            return colors.cyan;
        case 'FLIP':
            return colors.purple;
        case 'SOLD':
            return colors.gray;
        default:
            return colors.reset;
    }
}
async function getCommands() {
    const commands = [];
    const commandFiles = readdirSync('./build/commands');
    for (const file of commandFiles) {
        const command = (await import(`../commands/${file}`)).default;
        commands.push(command);
    }
    return commands;
}
<<<<<<< HEAD
function isUserAllowed(user) {
    return (user.permissions.has(PermissionsBitField.Flags.Administrator) ? true : (user.roles.cache.find(role => role.id === '1065413129955192874') != null));
}
export { isUserAllowed, log, getCommands };
=======
function isUserAdmin(user) {
    return user.permissions.has(PermissionsBitField.Flags.Administrator) ? true : user.roles.cache.find(r => r.name === "zoo keeper");
}
export { isUserAdmin, log, getCommands };
>>>>>>> fb0ffd37ce865e8b5a0f67a71559a1f3a66403f2
