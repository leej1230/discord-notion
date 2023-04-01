import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../structures/Commands";

export default new Command({
    name: 'changetime',
    description: 'Input the number 1 to 23 to adjust the time of the bot chilling (not yet implemented)',
    options: [
        {
            name: 'hour',
            description: 'Number of hours need to be shifted',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
    ],
    run: async({ interaction }) => {
        const hour = interaction.options.get('hour')?.value
        console.log(interaction.options.get);
        interaction.followUp(`Your input is ${hour}`);
    }
});