const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {
    
    var item = "";

    var time;

    var winnerCount;

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, jij kan dit niet doen!");

    winnerCount = args[0];
    time = args[1];
    item = args.splice(2,args.length).join(" ");

    message.delete();

    var date = new Date().getTime();
    var dateTime = new Date(date +(time * 1000));

    var giveawayEmbed = new discord.RichEmbed()
    .setTitle("🎉 **__GIVEAWAY__** 🎉")
    .setFooter(`Vervalt op:${dateTime}`)
    .setDescription(item)

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    setTimeout(function() {

         var random = 0;
         var winners = [];
         var inList = false;

         var peopleReacted = embedSend.reactions.get("🎉").users.array();

        for (let i = 0; i < peopleReacted.length; i++) {
            
            if (peopleReacted[i].id == bot.user.id){

                peopleReacted.splice(i,1);
                continue;

            }
            
        }
        
        if (peopleReacted.length == 0){

            return message.channel.send("Niemand heeft meegedaan dus wordt de giveaway ook geannuleerd");
        }

        if (peopleReacted.length < winnerCount){

            return message.channel.send("Er waren te weinig spelers die meededen!");

        }

        for (let i = 0; i < winnerCount; i++) {
            
            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let y = 0; y < winners.length; y++) {
                
                if (winners[y] == peopleReacted[random]){

                    inList = true;
                    i--;
                    break;
                }
                
            }

            if (!inList){
                winners.push(peopleReacted[random]);

            }
            var winnerEmbed = new discord.RichEmbed()
            .setTitle(`**__ER IS EEN WINNAAR!__**: ${winners[i].username} heeft ${item} gewonnen!!`)
            .addBlankField(true)
            .addField(`Proficiat, ${winners[i].username}! Je hebt **${item}** gewonnen!`)
            .setColor("#38cf9a");
            

            for (let i = 0; i < winners.length; i++) {
                
                message.channel.send(winnerEmbed);
                
            }

        }
        

    }, time * 1000);
 
}
 
module.exports.help = {
    name: "giveaway",
    description: "Start een giveaway"
}