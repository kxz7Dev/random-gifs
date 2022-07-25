const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
module.exports = {
    name: "avatar",
    description: 'Obtenha o avatar de qualquer usuário',
    options: [
      {
        name:"usuario",
        description: "Especifique o usuário do qual você deseja obter o avatar",
        type: 6
      }
    ],
      /**
       * 
       * @param {Client} client 
       * @param {CommandInteraction} interaction 
       */
    run: async (client, interaction) => {
       const target = interaction.options.getMember("usuario") || interaction.member;

      interaction.reply({
        embeds:[
          new MessageEmbed()
          .setImage(target.user.avatarURL({dynamic:true,size:2048}))
          .setFooter({text:`Requisitado por ${interaction.member.user.tag}`})
        ]
      })
      
}
};