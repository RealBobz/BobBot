const Discord = require('discord.js');
const fs = require("fs");

module.exports.run = async(bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send(`Sorry ${message.author.username}, jij hebt hier geen permissie voor!`);

    if (!args[0]) return message.channel.send("Gebruik .prefix <prefix>!");

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {
        prefixes: args[0]

    };

    fs.writeFileSync("./prefixes.json", JSON. stringify(prefixes), (err) => {
        if (err) console.log(err);

        if (err) return message.channel.send("Er was een eror!");
    });

    var stringEmbed = new Discord.RichEmbed()
    .setColor("#38cf9a")
    .setTitle("Prefix")
    .setDescription(`De prefix is aangepast naar ${args[0]} door ${message.author}!`);

    message.channel.send(stringEmbed);
}

module.exports.help = {
    name: "prefix"


}