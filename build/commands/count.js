import { getDocCount } from '../database.js';
export default {
    name: 'count',
    description: 'Replies with the number of monkis in the database',
    options: [],
    execute: async (interaction) => {
        const count = await getDocCount();
        await interaction.reply({
            content: `There are ${count} monkis in the database`,
            ephemeral: true
        });
    }
};
