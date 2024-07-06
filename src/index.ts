import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { register } from './buttonAction/register';
import { setup } from './commands/setup';
import { Commands } from './enum/commands';
import { CustomId } from './enum/customId';

dotenv.config();

const customConsole = {
    timestamp: function(): String {
        return (new Date)
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
            );
    },
    log: function(log: String) {
        console.log(this.timestamp(), log);
    },
    error: function(error: any) {
        console.error(this.timestamp, error);
    }
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
    customConsole.log(`${client.user?.tag}としてログインしました`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName === Commands.SetUp) {
            customConsole.log(`スラッシュコマンド"${interaction.commandName}"が呼び出されました`);
            try {
                await setup(interaction);
                customConsole.log(`スラッシュコマンド"${interaction.commandName}"が完了しました`);
            } catch (error: any) {
                customConsole.error(error);
            }
        }
    }

    if (interaction.isButton()) {
        if (interaction.customId === CustomId.StartRegister) {
            customConsole.log(`ボタン"${interaction.customId}"が発火しました`);
            try {
                await register(interaction);
                customConsole.log(`ボタン"${interaction.customId}"の処理が完了しました`);
            } catch (error: any) {
                customConsole.error(error);
            }
        }
    }
});

client.login(process.env.TOKEN);
