const Discord = require('discord.js');

module.exports.run = async (bot, message, args, ops) => {
    var guildIDDATA = ops.active.get(message.guild.id);

    if (!guildIDDATA) return message.channel.send("Er zijn momenteel geen liedjes aan het spelen!");

    var queue = guildIDDATA.queue;
    var nowPlaying = queue[0];

    var response = `${nowPlaying.songTitle} is nu aan het spelen! - Aangevraagd door: ${nowPlaying.requester} \n\n **Queue** \n `;

    for(var i = 0; i < queue.length; i++){
        response += `${i} - ${queue[i].songTitle} - Aangevraagd door ${queue[i].requester}\n`;



    }

    message.channel.send(response);
}


module.exports.help = {
    name: "queue"
}