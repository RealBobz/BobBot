const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (!banUser) return message.channel.send("De geruiker is niet gevonden");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, je hebt geen permissie hiervoor!");

    if (banUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" Deze gebruiker kan je niet kicken!");
    
    var reason = args.join(" ").slice(22);

    var banChannel = message.guild.channels.find("name", "log")

    var banMessage = new Discord.RichEmbed()
      .setTitle("Er is iemand gebanned!")
      .setColor("#ee0000")
      .addField("Banned gebruiker", `${banUser} met het ID ${banUser.id}`)
      .addField("Gekicked door", `${message.author} met het ID ${message.author.id}`)
      .addField("Met als reden", reason)
      .setFooter(message.createdAt);


    message.guild.member(banUser).ban(reason);



    return banChannel.send(banMessage);

}

module.exports.help = {
    name: "ban"


}

