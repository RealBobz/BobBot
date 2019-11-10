const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {


    try {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry maar je hebt hier geen toegang tot!");
        else {
        var dmtext = "**BobBotV1** \n\n **__Commands__**: \n\n **Standaard commands:** \n\n .help - De command die je net hebt gedaan! \n .serverinfo - Krijg alle info over de server! \n .info - Krijg alle info van deze bot! \n\n **Music bot commands:** \n\n .play <link van het liedje> - De bot zal het liedje afspelen in hat spreekkanaal dat je zit! \n .volume <0.1 - 5> - Zet het hoe luid de muziek moet spelen! \n .search <naam van het liedje> - zoek een liedje op via de search command! \n .leave - Laat de bot je spreekkanaal leaven! \n\n **Admin Commands:** \n\n .ban - Ban een speler, ranks = Mod en hoger \n .warn - Warn een speler!, ranks = Mod en hoger \n\n";
        
        var channeltext = new Discord.RichEmbed()
        .addField(message.author.username, "Al de Admin commands zijn verstuurd naar je dm's!")

        var dmEmbed = new Discord.RichEmbed()
        .setTitle("Deze bot is gemaakt door Bouwen!")
        .setFooter("@Sukoataka#4366");

       message.author.send(dmtext);
       message.author.send(dmEmbed);

        message.channel.send(channeltext);

        }

    } catch (error) {
        message.channel.send("Er is een error met dit commando!");
        
        

    }


}

module.exports.help = {
    name: "adminhelp"
}