import { getLongestReasonDoc } from '../database.js';
export default {
    name: 'longestreason',
    description: 'Replies with the monki with the longest reason in the database',
    options: [],
    execute: async (interaction) => {
        const info = await getLongestReasonDoc();
        if (info == null) {
            await interaction.reply({
                content: 'Failed to get info of longest reason monki!',
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
