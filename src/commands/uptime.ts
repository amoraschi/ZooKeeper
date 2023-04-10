import {startTime} from "../index";

export default {
    name: 'uptime',
    description: 'Responds with uptime',
    options: [],
    execute: async (interaction: any) => {
        await interaction.reply({
            content: `\`${(startTime - Date.now())/3600000}\`h uptime.`,
            ephemeral: true
        })
    }
}
