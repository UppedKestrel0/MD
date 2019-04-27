const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let reply = args.slice(0).join(" ");
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You are lacking the required permissions to run this command.");
    message.delete().catch(O_o=> {});
    
    return message.channel.send(reply);
    
};

module.exports.help = {
    name: "say"
}
