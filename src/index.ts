import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { setup } from './commands/setup';
import { Commands } from './enum/commands';
import { CustomId } from './enum/customId';

dotenv.config();

const customConsoleLog = (log: String) =>  {
    console.log(
        (new Date)
            .toLocaleString(
                "ja-JP",
                { 
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }
            ) + ' ' + log
    );
};

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
    ],
});

client.on('ready', () => {
    customConsoleLog(`${client.user?.tag}としてログインしました`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName === Commands.SetUp) {
            customConsoleLog(`スラッシュコマンド"${interaction.commandName}"が呼び出されました`);
            await setup(interaction);
            customConsoleLog(`スラッシュコマンド"${interaction.commandName}"が完了しました`);
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId === CustomId.StartRegister) {

        }
    }
});

client.login(process.env.TOKEN);
