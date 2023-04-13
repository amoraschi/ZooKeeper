import {startTime} from "../index.js";

export default {
    name: 'uptime',
    description: 'Responds with uptime',
    options: [],
    execute: async (interaction: any) => {
        await interaction.reply({
            content: `\`${(Date.now()) - startTime/3600000}\`h uptime.`,
            ephemeral: true
        })
    }
}
