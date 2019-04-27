const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let sicon = message.guild.iconURL
    let serverembed = new Discord.RichEmbed()
    .setTitle("**Server Information**")
    .setColor("#008906")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Server Info", "Limbo Realms is a new and upcoming MC server that will have 2 main gamemodes which will be: Skyblock and a surprise gamemode. :wink:")
    .addField("Total Members", message.guild.memberCount);

    message.delete().catch(O_o=> {});

    return message.author.sendMessage(serverembed);
    
};

module.exports.help = {
    name: "serverinfo"
}
