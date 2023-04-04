export default {
    name: 'eval',
    description: 'JS.',
    options: [ {
        name: "CMD",
        type: 3,
        description:"TS or JS idk",
        required: true
    }],
    execute: async (interaction: any) => {
        let string = interaction.options.getString("CMD")
        eval(string).then(res => {
            interaction.reply({
                embeds: {
                    color: 0x0099ff,
                    title: 'Code Eval',
                    description: '<:procoder:910353761220837386> ```js \n' + string + '```',
                    fields: [
                        {
                            name: 'Result',
                            value: "``" + res + "``",
                            inline: false,
                        }
                    ],
                    timestamp: new Date().toISOString(),
                },
                ephemeral: true
            })
        })
    }
}
