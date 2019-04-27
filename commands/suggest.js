const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    let suggestion = args.slice(0).join(" ");
    let reactionA = message.guild.emojis.get("571618868007665674");
    let reactionB = message.guild.emojis.get("571618902535045123");

    let suggestionEmbed = new discord.RichEmbed()
    .setTitle("**NEW SUGGESTION**")
    .setColor("#ffff00")
    .addField("__Suggestion__", suggestion)
    .addField("__Author__", message.author);

    let suggestionChannel = message.guild.channels.find(`name`, "suggestions");
    message.delete().catch(O_o=> {});
    
    suggestionChannel.send(suggestionEmbed).then(async msg => {

        await msg.react(reactionA)
        .then(msg.react(reactionB));

    });
};

module.exports.help = {
    name: "suggest"
}