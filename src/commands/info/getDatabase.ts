import { Client } from "@notionhq/client";
import { Command } from "../../structures/Commands";

const notion = new Client({auth: process.env['notionIntegrationToken']});
const databaseId:string = process.env['notionTodayTaskDatabaseId']!;

export default new Command({
    name: 'getdatabase',
    description: 'Retrieves database from notion database',
    run: async({ interaction }) => {
        const fs = require("fs");
        let d = fs.readFileSync("user.json") // reads the json file
        let users = JSON.parse(d) // turns json into js
        var h:number = users["timeDifferenceBetweenUTC"];

        var today:Date = new Date();
        today.setHours( today.getHours() + h );
        var todayInISO = today.toISOString();
        interaction.followUp(todayInISO);
        const data = await notion.databases.query({
            database_id:databaseId,
            filter: {
                and: [
                    {
                        property: "Due Date",
                        date: {
                            equals: todayInISO.slice(0,10),
                        },
                    },
                    {
                        or: [
                            {
                            property: "Status",
                            status: {
                                equals: "To Do",
                            }
                        },
                            {
                            property: "Status",
                            status: {
                                equals: "In progress",
                            }
                        },
                        ]
                    },

                ]
            }
        });
        console.log(data);
        interaction.followUp(todayInISO);
    }
});