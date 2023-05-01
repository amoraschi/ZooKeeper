import {addBulkDoc, getAllDocs, getDocCount} from '../database.js'
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";

export default {
    name: 'count',
    description: 'Replies with the number of monkis in the database',
    options: [],
    execute: async (interaction: any) => {
        const count = await getDocCount()

        await interaction.guild.members.fetch();
        let monkis = interaction.guild.roles.cache.get(process.env.MONKI_ROLE_ID).members;
        interaction.reply({
                content: `There are ${count} monkis in the database & ${monkis.size} monkis total.`,
                components: [new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('primary')
                            .setLabel('Account for undocumented monkis!')
                            .setStyle(ButtonStyle.Primary),
                    )],
                ephemeral: true
            }
        )
        const filter = i => {
            return true;
        }

        const collector = interaction.channel.createMessageComponentCollector({filter, time: 15000});

        collector.on('collect', async i => {
            let doced = (await (await getAllDocs()).find().toArray());
            let stringDoc = JSON.stringify(doced);
            let ml = monkis.keys();
            console.log(stringDoc)
            let mtc = new Array();
            for (let mlElement of ml) {
                console.log(mlElement);
                if (!stringDoc.includes(mlElement)) {
                    mtc.push({
                        id: `${mlElement}`,
                        reason: "someone used manual roles >:(",
                        timestamp: Date.now()
                    });
                }
            }
            if (mtc.length > 0) await addBulkDoc(mtc)

            await i.update({content: `${mtc.length} monkis added.`, components: []});
        });

    }

}

