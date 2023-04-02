import { getNewestDoc } from '../database.js';
export default {
    name: 'newest',
    description: 'Replies with the newest monki in the database',
    options: [],
    execute: async (interaction) => {
        const info = await getNewestDoc();
        if (info == null) {
            await interaction.reply({
                content: 'Failed to get info of newest monki!',
                ephemeral: true
            });
            return;
        }
        await interaction.reply({
            content: `Monki: <@${info.id}>\nTragedy reason: ${info.reason}\nDate of tragedy: <t:${(info.timestamp / 1000).toFixed()}:F> UTC`,
            ephemeral: true
        });
    }
};
