import { PermissionsBitField } from 'discord.js'
import { getDocCount } from '../database.js'
import {isUserAdmin} from "../utils/utils.js";

export default {
  name: 'count',
  description: 'Replies with the number of monkis in the database',
  options: [],
  execute: async (interaction: any) => {
    if (!isUserAdmin(interaction.member)) {
      await interaction.reply({
        content: 'You don\'t have permission to use this command',
        ephemeral: true
      })

      return
    }

    const count = await getDocCount()
    await interaction.reply({
      content: `There are ${count} monkis in the database`,
      ephemeral: true
    })
  }
}
