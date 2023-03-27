import { Command } from "../../structures/Commands";
import * as dayjs from 'dayjs';

export default new Command({
    name: 'whattime',
    description: 'Tells you the timezone that bot is chilling in',
    run:async ({interaction}) => {
        interaction.followUp(dayjs().format('YYYY/MM/DD HH:mm:ss'));
    }
});