import { Command } from "../../structures/Commands";

export default new Command({
    name: 'changetime',
    description: 'Input the number 0 to 23 to adjust the time of the bot chilling',
    run: async({ interaction, args }) => {
        console.log(interaction.options.get);
        interaction.followUp(`Your input is ${interaction.options.data}`);
    }
});