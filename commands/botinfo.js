const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let botembed = new Discord.RichEmbed()
    .setTitle("**Bot Information**")
    .setColor("#008906")
    .setThumbnail("https://cdn.discordapp.com/avatars/561093941139603466/65d7ae1b256909d2286fcf3ba9a647fd.png?size=256&quot")
    .addField("Bot Name", bot.user.username)
    .addField("Bot Job", "To assist in moderating this Discord.")
    .addField("Bot Creator", "@UppedKestrel0#9421");

    message.delete().catch(O_o=> {});

    return message.author.sendMessage(botembed);
    
};

module.exports.help = {
    name: "botinfo"
}
