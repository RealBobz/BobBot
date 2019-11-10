const Discord = require('discord.js');

module.exports.run = async(bot, message, args, ops) => {

    var guildIDDATA = ops.active.get(message.guild.id);

    if (!guildIDDATA) return message.channel.send("Er zijn momenteel geen liedjes aan het spelen!");
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Je kunt niet skippen omdat je niet in hetzelfde kanaal als de bot zit!");

    if (!guildIDDATA.dispatcher.paused) return message.channel.send("De muziek is niet gepauzeerd!");

    guildIDDATA.dispatcher.resume();

    return message.channel.send(`${guildIDDATA.queue[0].songTitle} is succesvol geresumed!`);
}

module.exports.help = {
    name: "resume"


}