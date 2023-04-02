import { ApplicationCommandOptionType } from "discord.js";
import { Command } from "../../structures/Commands";

var today:Date = new Date();
var todayInISO = today.toISOString();

export default new Command({
    name: 'changetime',
    description: `The hour will be added or subtracted from UTC(${todayInISO})`,
    options: [
        {
            name: 'hour',
            description: 'Number of hours need to be shifted',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
    ],
    run: async({ interaction }) => {
        const fs = require("fs");
        let data = fs.readFileSync("user.json") // reads the json file
        let users = JSON.parse(data) // turns json into js

        const hour:number = Number(interaction.options.get('hour')?.value)
        console.log(interaction.options.get);
        try{
            today.setHours(today.getHours() + hour);
            interaction.followUp(`Time is now set to ${today.toISOString()}`);
            users["timeDifferenceBetweenUTC"] = hour;
            fs.writeFileSync("user.json", JSON.stringify(users));
        } catch(e) {
            interaction.followUp("Invalid Input >:(");
        }
        
    }
});