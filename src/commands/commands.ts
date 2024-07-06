// コマンド登録時のみ使用
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { Commands } from "../enum/commands";

(async() => {
    dotenv.config();

    const commands = [
        {
            name: Commands.SetUp,
            description: "このチャンネルに初期設定メッセージを送信します"
        },
    ];

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);

    try {
        console.log("スラッシュコマンドの(再)登録を開始します");
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), { body: commands });
        console.log("スラッシュコマンドの(再)登録が完了しました");
    } catch (error) {
        console.error(error);
    }
})();
