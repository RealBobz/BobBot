const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (!kickUser) return message.channel.send("De geruiker is niet gevonden");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, je hebt geen permissie hiervoor!");

    if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" Deze gebruiker kan je niet kicken!");
    
    var reason = args.join(" ").slice(22);

    var kickChannel = message.guild.channels.find("name", "log")

    var kickMessage = new Discord.RichEmbed()
      .setDescription("Kick command")
      .setColor("#ee0000")
      .addField("Kicked gebruiker", `${kickUser} met het ID ${kickUser.id}`)
      .addField("Gekicked door", `${message.author} met het ID ${message.author.id}`)
      .addField("Met als reden", reason)
      .setFooter(message.createdAt)


    message.guild.member(kickUser).kick(reason);



    return kickChannel.send(kickMessage);

}

module.exports.help = {
    name: "kick"


}

