const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const config = require("../config.json");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(config.noperms);

  if(!wUser)
    return message.author.send("Usage: !warn [Player] [Reason]");

  if(wUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("You cannot warn that player!");


  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });


  let reason = args.join(" ").slice(22);
  if(!reason)
    return message.channel.send("Please Specify a proper reason!);
  let warnEmbed = new Discord.RichEmbed()
  .setTitle("**NEW WARNING**")
  .setColor("#ff0000")
  .addField("Warned User", wUser)
  .addField("Warned by", message.author)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason)
  .setTimestamp()
  .setFooter("Moderation");

 //DMing the player
  let WarnDM = new Discord.RichEmbed()
  .setTitle("**YOU HAVE RECIEVED A WARNING!**")
  .setColor("#ff0000")
  .addField("Reason", reason)
  .addField("Warned by", message.author)
  .addField("Time of Warning", message.createdAt)
  .addField("Total Player warnings", warns[wUser.id].warns)
  .setTimestamp();

  let warnchannel = message.guild.channels.find(`name`, "logs");
  message.delete().catch(O_o=> {});

  console.log(`${message.author.tag} ran the \"WARN\" command.`)
  await warnchannel.send(warnEmbed);
  await wUser.sendMessage(WarnDM);
}

module.exports.help = {
  name: "warn"
}
