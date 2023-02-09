import { PermissionsBitField } from 'discord.js';
import { addDoc } from '../database.js';
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
        console.log(mention);
        const isUserAdmin = interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) ? true : interaction.member.roles.cache.find(r => r.name === "zoo keeper");
        if (!isUserAdmin) {
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
            reason: reason,
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
