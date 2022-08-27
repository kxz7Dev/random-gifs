const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ping",
    description: 'Veja o Ping do Bot',
    run: async (client, interaction) => {
        
        let color = getPingColor(client.ws.ping)
        const embed = new MessageEmbed()
        .setTitle(":ping_pong: Pong!")
        .setDescription(`Ping do Bot: ${client.ws.ping}ms!`)
        .setColor(color)
        
        interaction.reply({ embeds: [embed] });

    }
};

function getPingColor(ping) {
    if (ping < 60) return "GREEN"
    else if (ping > 60 && ping < 120) return "YELLOW"
    else if (ping > 120) return "RED"
    
    return "BLACK"
}
