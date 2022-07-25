const { Client, MessageEmbed, User, DiscordAPIError } = require("discord.js");
const { iconid, gifid, bannerid, guildid } = require("../config.json")
const axios = require("axios");
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {
const servidor = client.guilds.cache.get("") // ID DO SERVIDOR



  if (!client.guilds.cache.get(guildid)) return;

  setInterval(() => {

    let randomUser = client.users.cache.filter(a => !a.bot)
      .filter(a => a.avatarURL({ dynamic: true, size: 1024 })).random();

    axios.get(`https://discord.com/api/users/${randomUser.id}`, {
      headers: {
        Authorization: "Bot " + client.token,
      }
    }).then(res => {
      if (res.data.banner) {
        if (!client.channels.cache.get(bannerid)) { };
        if (res.data.banner.startsWith("a_")) {
          client.guilds?.cache?.get(guildid).channels?.cache?.get(bannerid)?.send({
            embeds: [new MessageEmbed().setAuthor({name: servidor.name,  iconURL: servidor.iconURL({dynamic:true}) || " "})
            .setColor("RANDOM")
.setFooter({text: randomUser.id})
              .setImage(`https://cdn.discordapp.com/banners/${randomUser.id}/${res.data.banner}.gif?size=2048`)]
          })
        }
        else {
          client.guilds?.cache?.get(guildid).channels?.cache?.get(bannerid)?.send({
            embeds: [new MessageEmbed().setAuthor({name: servidor.name,  iconURL: servidor.iconURL({dynamic:true}) || " "})
            .setColor("RANDOM")
.setFooter({text: randomUser.id})
              .setImage(`https://cdn.discordapp.com/banners/${randomUser.id}/${res.data.banner}.png?size=2048`)]
          })
        }

      }
    })
    .catch(() => {})

    if (randomUser.avatarURL({ dynamic: true, size: 1024 }).split("?")[0].endsWith(".gif")) {

      if (!client.channels.cache.get(gifid)) return;
      client.guilds?.cache?.get(guildid).channels?.cache?.get(gifid)?.send({
        embeds: [new MessageEmbed().setAuthor({name: servidor.name,  iconURL: servidor.iconURL({dynamic:true}) || " "})
        .setColor("RANDOM")
.setFooter({text: randomUser.id})
          .setImage(randomUser.avatarURL({ dynamic: true, size: 1024 }))]
      })
    }
    else {
      if (!client.channels.cache.get(iconid)) return;

      client.guilds?.cache?.get(guildid).channels?.cache?.get(iconid)?.send({
        embeds: [new MessageEmbed().setAuthor({name: servidor.name,  iconURL: servidor.iconURL({dynamic:true}) || " "})
        .setColor("RANDOM")
  .setFooter({text: randomUser.id})
          .setImage(randomUser.avatarURL({ dynamic: true, size: 1024 }))]
      })
    }
  }, 5 * 1000)
};

