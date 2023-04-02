import { getShortestReasonDoc } from '../database.js';
export default {
    name: 'shortestreason',
    description: 'Replies with the monki with the shortest reason in the database',
    options: [],
    execute: async (interaction) => {
        const info = await getShortestReasonDoc();
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
