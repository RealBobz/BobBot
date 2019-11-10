const Discord = require('discord.js');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const botConfig = require("./botconfig.json");
const fs = require("fs");

const active = new Map();



fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  var jsFiles = files.filter(f => f.split(".").pop() === "js");


  if (jsFiles.length <= 0) {
    console.log(`${bot.user.username} kon geen files vinden in dit mapje!`);
    return;
  }

  jsFiles.forEach((f, i) => {

    var fileGet = require(`./commands/${f}`);
    console.log(`De file ${f} is succesvol ingeladen`);

    bot.commands.set(fileGet.help.name, fileGet);


  })

});


bot.on("ready", async () => {

  console.log(`${bot.user.username} is online!`)

  bot.user.setActivity("met je moeder!", { type: "PLAYING" });

});

bot.on("guildMemberAdd", member =>{

  var role = member.guild.roles.find("name", "Member");

  const channel = member.guild.channels.find("name", "💬hub");

  if (!role) return;

  member.addRole(role);

  channel.send(`Welkom in de server van de WaG clan ${member}!`);

})

bot.on("message", async message => {

  //als bot bericht stuurt gebeurt er niks 
  if (message.author.bot) return;

  if (message.channel.type === "dm") return;


//  var prefix = botConfig.prefix;

  var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

  if (!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
    prefixes: botConfig.prefix
    };
  }

  var prefix = prefixes[message.guild.id].prefixes;

  var messageArray = message.content.split(" ");

  var command = messageArray[0];

  var args = messageArray.slice(1);

  var ops = {
    active: active

  }

  var commands = bot.commands.get(command.slice(prefix.length));

  if (commands) commands.run(bot, message, args, ops);



  // if (command === `${prefix}hallo`) {

  //   return message.channel.send("hallo daar!");


  // }

  // if (command === `${prefix}info`) {

  //   var botIcon = bot.user.displayAvatarURL;

  //   var botEmbed = new Discord.RichEmbed()
  //     .setDescription("BobBotV1 Informatie")
  //     .setColor("#38cf9a")
  //     .setThumbnail(botIcon)
  //     .setFooter("Dit is een testing bot!")
  //     .addField("Gemaakt op", bot.user.createdAt)
  //     .addField("Bot naam", bot.user.username);

  //   return message.channel.send(botEmbed);


  // }


   //if (command === `${prefix}serverinfo`) {

    //  var icon = message.guild.iconURL;

    //  var serverEmbed = new Discord.RichEmbed()
    //    .setDescription("Server Info")
    //    .setColor("#38cf9a")
    //    .addField("Bot naam", bot.user.username)
    //    .thumbnail(Icon)
    //    .addField("Je bent gejoind op", message.member.joinedAt)
    //    .addField("Totaal aantal members:", message.guild.memberCount);

      //return message.channel.send(serverEmbed);

 // }



  if (command === `${prefix}kick`) {

    // .kick (naam) (reden)

    // var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members(arguments[0]));

    // if (!kickUser) return message.channel.send("De geruiker is niet gevonden");

    // var reason = arguments.join(" ").slice(22);

    // if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, je hebt geen permissie hiervoor!");

    // if (kickUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(" Deze gebruiker kan je niet kicken!");

    // var kickMessage = new Discord.RichEmbed()
    //   .setDescription("Kick command")
    //   .setColor("#ee0000")
    //   .addField("Kicked gebruiker", kickUser)
    //   .addField(kickUser, "is gekicked door", message.author)
    //   .addField("Met als reden", reason);

    // var kickChannel = message.guild.channels.find(`name`, "bobbot-log");

    // if (!kickChannel) return message.guild.send("Kan het kanaal niet vinden");

    // message.guild.member(kickUser).kick(reason);



    // return message.channel.send(kickMessage);

  }



});

bot.login(process.env.token);



