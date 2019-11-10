const Discord = require('discord.js');
const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Sorry ${message.author} jij kunt dit niet doen!`);

    var user = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    if (!user) return message.channel.send("Geef een gebruiker op OF de gebruiker die je hebt gekozen zit niet op deze server!");

    if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Sorry ${message.author} je kan deze gebruiker niet warnen!`);


    var reason = args.join(" ").slice(22);
    
    if (!reason) return message.channel.send(`Je moet wel een reden opgeven, ${message.author}!`);

    if (!warns[user.id]) warns[user.id] = {
        warns: 0
    };

    warns[user.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {

        if (err) console.log(err)
        if (err) return ("Er was een error!", (err));

    });

    var warnEmbed = new Discord.RichEmbed()
        .setDescription("Warn")
        .setColor("#ee0000")
        .addField("Warned gebruiker", user)
        .addField("Aantal keren dat deze gebruiker is gewarned", warns[user.id].warns)
        .addField("Gewarned door", message.author)
        .addField("Reden", reason);

    var warnChannel = message.guild.channels.find("name", "log");

    warnChannel.send(warnEmbed);

    if (warns[user.id].warns == 3) {
        var dmtext = "**BobBotV1** \n\n **__LET OP!__**  \n Als je nog een warn krijgt, word je gekicked!"

        message.channel.send(dmtext)

    } else if (warns[user.id].warns == 4) {
        var reason = ("Teveel warns gekregen")

        var warnkickEmbed = new Discord.RichEmbed()
            .setDescription("Kicked door warns")
            .setColor("#ee0000")
            .addField(`Kicked gerbuiker ${user.username} met als ID ${user.id}`)
            .addField(`Gekicked door BobBotV1 met als ID ${bot.user.id}`)
            .addField("Met als reden: 4 warnings gekregen!");

            var kickChannel = message.guild.channels.find("name", "log");

            kickChannel.send(warnkickEmbed)

    message.guild.member(user).kick("Teveel warns");

    message.channel.send(`${user} is gekicked door ${bot.user.username} met als reden: Teveel warns gekregen!`)


    } else if (warns[user.id].warns == 5) {


    }
}

module.exports.help = {
    name: "warn"


}