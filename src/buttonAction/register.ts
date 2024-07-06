import { ActionRowBuilder, ButtonInteraction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { CustomId } from "../enum/customId";

export const register = async (interaction: ButtonInteraction): Promise<void> => {

    const fullNameInput = new TextInputBuilder()
        .setCustomId(CustomId.FullNameInput)
        .setLabel("漢字フルネーム　(※スペースを入れずに入力してください)")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("横浜太郎");

    const familyNameInput = new TextInputBuilder()
        .setCustomId(CustomId.FamilyNameInput)
        .setLabel("名字ローマ字　(※全て小文字で入力してください)")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("yokohama");

    const givenNameInput = new TextInputBuilder()
        .setCustomId(CustomId.GivenNameInput)
        .setLabel("名前ローマ字　(※全て小文字で入力してください)")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("taro");

    const graduatesInput = new TextInputBuilder()
        .setCustomId(CustomId.GraduatesInput)
        .setLabel("卒業期　(※数字のみ入力してください)")
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setMaxLength(3) // とりあえず3桁までにしておく
        .setPlaceholder("50");

    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(fullNameInput);
    const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(familyNameInput);
    const thirdActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(givenNameInput);
    const fourthActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(graduatesInput);

    const modal = new ModalBuilder()
        .setCustomId(CustomId.RegisterModal)
        .setTitle("お名前 初期設定")
        .addComponents(
            firstActionRow,
            secondActionRow,
            thirdActionRow,
            fourthActionRow,
        );
    
    await interaction.showModal(modal);
};