const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const axios = require("axios");
module.exports = {
  name: "banner",
  description: 'Obtenha o banner de qualquer usuário',
  options: [
    {
      name: "usuario",
      description: "Especifique o usuário cujo banner você quer roubar",
      type: 6
    }
  ],
  /**
   * 
   * @param {Clinet} client 
   * @param {CommandInteraction} interaction 
   */
  run: async (client, interaction) => {
    const target = interaction.options.getMember("usuario") || interaction.member;

    axios.get(`https://discord.com/api/users/${target.id}`, {
      headers: {
        Authorization: "Bot " + client.token,
      }
    }).then(res => {
      if (res.data.banner) {
        if (res.data.banner.startsWith("a_")) {
          interaction.reply({
            embeds: [new MessageEmbed().setTitle(target.user.tag)
              .setDescription(`[Baixar](https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.gif?size=4096)`)
              .setImage(`https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.gif?size=4096`)]
            
          })
        }
        else {
          interaction.reply({
            embeds: [new MessageEmbed().setTitle(target.user.tag).setDescription(`[Baixar](https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.png?size=4096)`)
              .setImage(`https://cdn.discordapp.com/banners/${target.id}/${res.data.banner}.png?size=4096`)]
          })
        }
      } else {
        interaction.reply({embeds:[new MessageEmbed().setDescription("O usuário não tem banner")]})
      }
    })
  }
}
