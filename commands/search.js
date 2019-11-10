const search = require("yt-search");

module.exports.run = async (bot, message, args, ops) => {

  search(args.join(' '), function(err, res)  {
    if (err) return message.channel.send("Er was een error");

    var videos = res.videos.slice(0, 10);

    var response = ' ';

    for (var i in  videos) {
      response += `**[${parseInt(i)+1}];** ${videos[i].title} \r\n `;
    }
    
    response += `Kies een nummer tussen 1 en ${videos.length}`; 

    message.channel.send(response)

          // Filter opzetten voor het nakijken als je een nummer meegeeft tussen 0 en het opgegeven getal van de opzoeklijst.
          const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;
 
          // Creeër een bericht ontvanger met die filter.
          const collection = message.channel.createMessageCollector(filter);
   
          // Steek al de video's die we vinden hier in onze ontvanger.
          collection.videos = videos;
   
          // Als er een bericht is gestuurd met cijfers tussen 0 en opgegeven getal dan gaan we het play command oproepen.
          collection.once('collect', function (music) {
   
              // Play command binnen halen.
              var commandFile = require('./play.js');
   
              // Play afvuren en liedje starten of bij de lijst toevoegen.
              commandFile.run(bot, message, [this.videos[parseInt(music.content) - 1].url], ops);

      });
 
          });
       
      }
       
      module.exports.help = {
          name: "search",
          description: "Zoeken naar liedjes"
      }