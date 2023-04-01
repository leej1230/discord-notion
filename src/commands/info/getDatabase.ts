import { Client } from "@notionhq/client";
import { Command } from "../../structures/Commands";

const notion = new Client({auth: process.env['notionIntegrationToken']});

const databaseId:string = process.env['notionTodayTaskDatabaseId']!;

export default new Command({
    name: 'getdatabase',
    description: 'Retrieves database from notion database',
    run: async({ interaction }) => {
        var today = new Date();
        var todayInISO = today.toISOString();
        interaction.followUp(databaseId);
        const data = await notion.databases.query({
            database_id:databaseId,
            filter: {
                // and: [
                    // {
                        property: "Due Date",
                        date: {
                            equals: todayInISO.slice(0,10),
                        },
                    // },

                // ]
            }
        });
        console.log(data);
        interaction.followUp(todayInISO);
    }
});