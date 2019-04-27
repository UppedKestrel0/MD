const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client();
const fs = require("fs");
const Token = process.env.token;
let profanities = ["fuck", "nigger", "cunt", "bitch", "asshole", "nigga", "tits", "sex", " https://discord.gg/", "https://", "http://", "porn"];

//COMMAND HANDLER
bot.commands = new Discord.Collection();
fs.readdir("./commands", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f,i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} has been loaded!`);
    bot.commands.set(props.help.name, props)
  });
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if (!message.content.startsWith(config.prefix)) return;

  let prefix = ("!");
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  });

bot.on('guildMemberAdd', (guildMember) => {
  guildMember.addRole(guildMember.guild.roles.find(role => role.name === "Member"));

  guildMember.guild.channels.get("528370309531697173").send(`Welcome <@${guildMember.id}>`);
});

//EVENTS
bot.on('ready', async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} server/s!`)

    bot.user.setActivity("Minecraft Dialations | !help for a list of commands", {type: "PLAYING"});
});

bot.on('error', error => { console.log(error) });
bot.login(Token);
