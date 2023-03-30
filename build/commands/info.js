import { getDoc } from '../database.js';
<<<<<<< HEAD
import { isUserAllowed } from '../utils/utils.js';
=======
import { isUserAdmin } from "../utils/utils.js";
>>>>>>> fb0ffd37ce865e8b5a0f67a71559a1f3a66403f2
export default {
    name: 'info',
    description: 'Replies with the info of a monki',
    options: [
        {
            name: 'user',
            description: 'Monki to get info of',
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
                content: `<@${mention.id}> is not a monki`,
                ephemeral: true
            });
            return;
        }
        const info = await getDoc(mention.id);
        if (info == null) {
            await interaction.reply({
                content: `Failed to get info of <@${mention.id}>!`,
                ephemeral: true
            });
            return;
        }
        await interaction.reply({
            content: `Monki: <@${mention.id}>\nTragedy reason: ${info.reason}\nDate of tragedy: <t:${(info.timestamp / 1000).toFixed()}:F> UTC`,
            ephemeral: true
        });
    }
};
