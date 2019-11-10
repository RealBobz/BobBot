const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    var clearembed = new Discord.RichEmbed()
    .setDescription("Er zijn berichten verwijderd door BobBotV1!")
    .addField(`${bot.user.username} heeft ${args[0]} berichten verwijderd!`)
    .setColor("#38cf9a")
    .setFooter(" ")


    // .clear (aantal)

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Je hebt hier geen permissie voor!");

    if (!args[0]) return message.reply("Je moet een aantal ingeven van de hoeveelheid berichten die je wilt verwijderen!");

    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(() => {

            message.channel.send(clearembed).then(message.delete(300))

    });

    } else {
        return message.reply("Je moet wel een getal opgeven!");
    }


}


module.exports.help = {
    name: "clear"
}