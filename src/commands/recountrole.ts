export default {
    name: 'recountrole',
    description: 'Observes all users with Monki role and if they lack history in DB then adds them.',
    options: [],
    execute: async (interaction: any) => {

        await interaction.reply({
            content: `\`${interaction.guild.roles.get(process.env.MONKI_ROLE_ID).members}\` users with monkey role.`,
            ephemeral: true
        })
    }
}
