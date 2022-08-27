﻿const fs = require('fs');
const { Client } = require('discord.js');
const client = new Client({ intents: 32767 });
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");

const {token} = require("./config.json")
global.client = client;
client.commands = (global.commands = []);

function handlers() {
fs.readdir("./commands/", (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);

        client.commands.push({
            name: props.name.toLowerCase(),
            description: props.description,
            options: props.options,
            type: props.type,
        })
        console.log(`SlashCommands Carregados: ${props.name}`);
    });
});

fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        console.log(`Evento Iniciado: ${eventName}`);
        client.on(eventName, (...args) => {
            event(client, ...args);
        });
    });
});

}

handlers()
client.on("ready", async () => {

    console.log("Random Gifs Online");
    client.user.setActivity("kxz7Dev#6993 | dznwtf", { type: "PLAYING" });
    const rest = new REST({ version: "10" }).setToken(token);
    try {
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: commands,
        });

    } catch (error) {
        console.error(error);
    }
});
process.on('multipleResolves', (type, reason, promise) => {
    console.log(`🚫\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫\n\n` + error, origin)
});


 //////////////    ANT MENSAGENS EM CHAT DE IMAGENS  //////////////

const c = {
    status: false,
    channelId: "id do canal"
}

client.on("message", m => {
if(c.status === true) {
        if (m.channel.id !== c.channelId) { // girl-gif
      return;
    }
    if (m.author.id === m.guild.ownerID && client.user.id) return;
    if (m.attachments.size < 1) m.delete().catch(() => m.channel.send({ content: 'Sem imagens aqui, obs: não foi possivel apagar a imagem, peça que um admin mude minhas permissões!'}))
  
}
});


function login(botToken) {
client.login(botToken);
}

login(token)
