import { getDocCount } from '../database.js';
<<<<<<< HEAD
import { isUserAllowed } from '../utils/utils.js';
=======
import { isUserAdmin } from "../utils/utils.js";
>>>>>>> fb0ffd37ce865e8b5a0f67a71559a1f3a66403f2
export default {
    name: 'count',
    description: 'Replies with the number of monkis in the database',
    options: [],
    execute: async (interaction) => {
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
        const count = await getDocCount();
        await interaction.reply({
            content: `There are ${count} monkis in the database`,
            ephemeral: true
        });
    }
};
