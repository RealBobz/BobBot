const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {

    var botIcon = bot.user.displayAvatarURL;

     var botEmbed = new Discord.RichEmbed()
       .setDescription("BobBotV1 Informatie")
       .setColor("#38cf9a")
       .setThumbnail(botIcon)
       .setFooter("Deze bot werd gemaakt door @Sukoataka#4366!")
       .addField("Gemaakt op", bot.user.createdAt)
       .addField("Bot naam", bot.user.username);

    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "info"


}