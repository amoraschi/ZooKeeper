import { removeDoc } from '../database.js';
<<<<<<< HEAD
import { isUserAllowed } from '../utils/utils.js';
=======
import { isUserAdmin } from "../utils/utils.js";
>>>>>>> fb0ffd37ce865e8b5a0f67a71559a1f3a66403f2
export default {
    name: 'demonkify',
    description: 'Converts monki to a normal user',
    options: [
        {
            name: 'user',
            description: 'User to demonkify',
            type: 6,
            required: true
        }
    ],
    execute: async (interaction) => {
        const mention = interaction.options.getUser('user');
<<<<<<< HEAD
        if (!isUserAllowed(interaction.member)) {
=======
        if (!isUserAdmin(interaction.member)) {
>>>>>>> fb0ffd37ce865e8b5a0f67a71559a1f3a66403f2
            await interaction.reply({
                content: 'You don\'t have permission to use this command',
                ephemeral: true
            });
            return;
        }
        const role = interaction.guild.roles.cache.find((role) => role.id === process.env.MONKI_ROLE_ID);
        const member = interaction.guild.members.cache.find((member) => member.id === mention.id);
        if (!member.roles.cache.has(role.id)) {
            await interaction.reply({
                content: `<@${mention.id}> is already a normal user`,
                ephemeral: true
            });
            return;
        }
        await member.roles.remove(role);
        await removeDoc(mention.id).then(async () => {
            await interaction.reply(`Demonkified ${mention.tag}!`);
        }, async (reason) => {
            await interaction.reply({
                content: `Failed to remove <@${mention.id}> from database! Reason: ${reason}`,
                ephemeral: true
            });
        });
    }
};
