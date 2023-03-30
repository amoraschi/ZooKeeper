import { addDoc } from '../database.js';
<<<<<<< HEAD
import { isUserAllowed } from '../utils/utils.js';
=======
import { isUserAdmin } from "../utils/utils.js";
>>>>>>> fb0ffd37ce865e8b5a0f67a71559a1f3a66403f2
export default {
    name: 'monkify',
    description: 'Converts user to a monki',
    options: [
        {
            name: 'user',
            description: 'User to monkify',
            type: 6,
            required: true
        },
        {
            name: 'reason',
            description: 'Reason for monki conversion',
            type: 3,
            required: true
        }
    ],
    execute: async (interaction) => {
        const reason = interaction.options.getString('reason');
        const mention = interaction.options.getUser('user');
<<<<<<< HEAD
        if (!isUserAllowed(interaction.member)) {
=======
        console.log(mention);
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
        if (member.roles.cache.has(role.id)) {
            await interaction.reply({
                content: `<@${mention.id}> is already a monki`,
                ephemeral: true
            });
            return;
        }
        await member.roles.add(role);
        await addDoc({
            id: mention.id,
            reason,
            timestamp: Date.now()
        }).then(async () => {
            await interaction.reply(`Monkified ${mention.tag}!`);
        }, async (reason) => {
            await interaction.reply({
                content: `Failed to add <@${mention.id}> to database! Reason: ${reason}`,
                ephemeral: true
            });
        });
    }
};
