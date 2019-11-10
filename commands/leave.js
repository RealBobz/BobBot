const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send("Verbind met een spraakkanaal!");

    if (!message.guild.me.voiceChannel) return message.channel.send("Sorry, de bot is niet verbonden met een spraakkanaal!");

    if (message.guild.me.voiceChannel != message.member.voiceChannel) return message.channel.send("Je bent niet met hetzelfde kanaal verbonden als de bot!");

    if (message.member.hasPermission("MANAGE_MESSAGES")) {

        message.guild.me.voiceChannel.leave();

        message.channel.send("BobBotV1 verlaat het kanaal!");
    } else {
        return("Vraag het aub aan een Mod/Admin/Owner om de bot te laten leaven!");

    }
}

module.exports.help = {
    name: "leave"
}