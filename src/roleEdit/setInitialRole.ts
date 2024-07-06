import { Colors, EmbedBuilder, GuildMember, ModalSubmitInteraction, Role } from "discord.js";
import { CustomId } from "../enum/customId";

export const setInitialRole = async (interaction: ModalSubmitInteraction): Promise<void> => {

    const fullName = interaction.fields.getTextInputValue(CustomId.FullNameInput);
    const familyName = interaction.fields.getTextInputValue(CustomId.FamilyNameInput);
    const givenName = interaction.fields.getTextInputValue(CustomId.GivenNameInput);
    const graduates = interaction.fields.getTextInputValue(CustomId.GraduatesInput);

    if (!isValid(fullName, familyName, givenName, graduates)) {
        const fields = new Array<{ name: string, value: string }>();
        if (!/^\S+$/.test(fullName)) fields.push({ name: "漢字フルネームに間違いがあります", value: "スペースを入れずに入力してください\nㅤ" });
        if (!/^[A-Za-z]+$/.test(familyName)) fields.push({ name: "名字ローマ字に間違いがあります", value: "半角アルファベットで入力してください\nㅤ" });
        if (!/^[A-Za-z]+$/.test(givenName)) fields.push({ name: "名前ローマ字に間違いがあります", value: "半角アルファベットで入力してください\nㅤ" });
        if (!/^\d+$/.test(graduates)) fields.push({ name: "卒業期に間違いがあります", value: "半角数字のみ入力してください" });

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle("⚠︎入力内容に誤りがあります⚠︎")
                    .addFields(fields)
                    .setColor(Colors.Yellow)
            ],
            ephemeral: true,
        });
        return;
    }

    const guild = interaction.guild;
    const member = interaction.member as GuildMember;
    member.setNickname(fullName).catch(console.error);

    const nameRole = guild?.roles.cache.find(role => role.name === `${familyName.toLowerCase()}.${givenName.toLowerCase()}.${graduates}`);
    if (!nameRole) {
        const newNameRole = await guild?.roles.create({
            name: `${familyName.toLowerCase()}.${givenName.toLowerCase()}.${graduates}`,
            mentionable: true,
        }) as Role;
        member.roles.add(newNameRole);
    }
    else {
        member.roles.add(nameRole);
    }

    const graduatesRole = guild?.roles.cache.find(role => role.name === `${graduates}期`)
    if (!graduatesRole) {
        const newGraduatesRole = await guild?.roles.create({
            name: `${graduates}期`,
            mentionable: true,
        }) as Role;
        member.roles.add(newGraduatesRole);
    }
    else {
        member.roles.add(graduatesRole);
    }

    const configuredRole = guild?.roles.cache.find(role => role.name === "設定済み");
    if (configuredRole) member.roles.add(configuredRole);

    await interaction.reply({ content: "設定が完了しました！", ephemeral: true });
};

const isValid = (fullName: string, familyName: string, givenName: string, graduates: string): boolean => {
    if (!/^\S+$/.test(fullName)) return false;
    if (!/^[A-Za-z]+$/.test(familyName)) return false;
    if (!/^[A-Za-z]+$/.test(givenName)) return false;
    if (!/^\d+$/.test(graduates)) return false;

    return true;
};
