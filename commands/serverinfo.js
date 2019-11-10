const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {

    var icon = message.guild.iconURL;

     var serverEmbed = new Discord.RichEmbed()
       .setDescription("Server Info")
       .setColor("#38cf9a")
       .addField("Bot naam", bot.user.username)
       .setThumbnail(icon)
       .addField("Je bent gejoind op", message.member.joinedAt)
       .addField("Totaal aantal members:", message.guild.memberCount);

    return message.channel.send(serverEmbed);

}

module.exports.help = {
    name: "serverinfo"


}