export default {
  name: 'ping',
  description: 'Replies with Pong!',
  options: [],
  execute: async (interaction: any) => {
    await interaction.reply({
      content: 'Pong! I\'m still alive',
      ephemeral: true
    })
  }
}
