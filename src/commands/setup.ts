import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js";
import { CustomId } from "../enum/customId";

export const setup = async (interaction: CommandInteraction): Promise<void> => {
    await interaction.reply(
        { 
            embeds: [
                new EmbedBuilder()
                    .setTitle("光陵会Discordサーバーへようこそ！")
                    .addFields(
                        { name: "このサーバーって？", value: "光陵会の事務連絡や雑談をするためのサーバーです。\nㅤ" },
                        { name: "まず何をすればいい？", value: "始めに、このサーバーで表示する名前(本名)と必要なロールを設定します。\n下のボタンから登録を行ってください。\n登録が終わると各チャンネルを閲覧できるようになります。\nㅤ" },
                        { name: "気をつけた方がいいことは？", value: "Enterキーでメッセージが送信されます。改行は Shift+Enter です。うっかり送信しないように注意しましょう。"},
                    )
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .setComponents(
                        new ButtonBuilder()
                            .setCustomId(CustomId.StartRegister)
                            .setLabel('登録を開始する')
                            .setStyle(ButtonStyle.Primary)
                    )
            ]
        }
    );
};
