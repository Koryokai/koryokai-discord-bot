import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

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

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'setup') {
        customConsoleLog(`スラッシュコマンド"${interaction.commandName}"が呼び出されました`);
        await interaction.reply(
            { 
                embeds: [
                    new EmbedBuilder()
                        .setTitle("光陵会Discordサーバーへようこそ！")
                        .addFields(
                            { name: "このサーバーって？", value: "光陵会の事務連絡や雑談をするためのサーバーです。" },
                            { name: "まず何をすればいい？", value: "始めに、このサーバーで表示する名前(本名)と必要なロールを設定します。\n下のボタンから登録を行ってください。\n登録が終わると各チャンネルを閲覧できるようになります。" },
                            { name: "気をつけた方がいいことは？", value: "Enterキーでメッセージが送信されます。改行は Shift+Enter です。間違えて送信しないように注意しましょう。"},
                        )
                ],
                components: [
                    new ActionRowBuilder<ButtonBuilder>()
                        .setComponents(
                            new ButtonBuilder()
                                .setCustomId('start-register')
                                .setLabel('登録を開始する')
                                .setStyle(ButtonStyle.Primary)
                        )
                ]
            }
        );
        customConsoleLog(`スラッシュコマンド"${interaction.commandName}"が完了しました`);
    }
});

client.login(process.env.TOKEN);
