const Discord = require('discord.js');

module.exports.run = async(bot, message, args, ops) => {

    var guildIDDATA = ops.active.get(message.guild.id);

    if (!guildIDDATA) return message.channel.send("Er zijn momenteel geen liedjes aan het spelen!");
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Je kunt niet skippen omdat je niet in hetzelfde kanaal als de bot zit!");
    
    if (isNaN(args[0]) ||  args[0] < 0 || args[0] > 150) return message.channel.send("Geef een nummer tussen 0 en 150 op!");

    guildIDDATA.dispatcher.setVolume(args[0] / 100);

    return message.channel.send(`Het volume is aangepast voor ${guildIDDATA.queue[0].songTitle} op ${args[0]}`);



}

module.exports.help = {
    name: "volume"


}