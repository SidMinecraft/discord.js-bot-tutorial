const Discord = require("discord.js");
const ms = require("ms");
const bot = new Discord.Client();
const moment = require("moment");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const ytdl = require("ytdl-core");
const child_process = require("child_process");

const token = "ODAyMjE0NDg0ODgxNzAyOTU0.YAr-dQ.WgRQwXBaF4dLv7RiGL9iNMMFEG0"

const PREFIX = "$";

var version = "1.0.0";
var servers = {};
const Delay = msec => new Promise(resolve => setTimeout(resolve, msec));

// Run when bot is ready
bot.on("ready", () => {
    console.log(`Running bot on ${bot.guilds.cache.size} server(s)`);
    let Statuses = ["Sid's code", "some music"];
    let StatusNumber = 0;
    function changeStatus() {
        if (StatusNumber >= Statuses.length) StatusNumber = 0;
        bot.user.setActivity({
        name: Statuses[StatusNumber],
        type: "LISTENING"
            });
        StatusNumber++;
    }
    changeStatus();
    setInterval(changeStatus, 4000);
});


// Run on message sent
bot.on("message", async message => {
    // Checks if the message author is not a bot and isn't sent in a DM channel
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let com = command.toLowerCase();
    let sender = message.author;
    
    // Commands
    if(com == PREFIX+"help") {
        message.reply("Here is some help:");
        message.channel.send(new Discord.MessageEmbed()
            .setTitle("Help")
            .setDescription("My prefix is `$`")
            .addField("Commands", [`${PREFIX}help | Get some help and a list of commands`])
            .setColor("#00FF00")
        )
    }
    if(com == PREFIX+"name") {
        if(!args[1]) 
            return message.reply(`Your name is ${args[0]}`);
        if(args[1]) 
            return message.reply(`Your name is ${args[0]} ${args[1]}`);
    }
    if(com = PREFIX+"say") {
        if(!message.member.hasPermission(["MANAGE_MESSAGES"]))
            return message.reply("You do not have permission to use this command!");

        let argsresult;
        let mchannel = message.guild.channels.cache.find(
            ch => (ch.name = args[1])
        );
        
        message.delete();
        if(mchannel) {
            argsresult = args.slice(1).join(" ");
            message.channel.send(argsresult);
        } else {
            argsresult = args.join(" ")
            message.channel.send(argsresult);
        }
    }
});


bot.login(token);

// web server ------------------------------//
const http = require("http");

const server = http
    .createServer((req, res) => {
    res.end(
        "Hello! This is the webserver for the discord bot on " +
        process.env.PROJECT_DOMAIN
    );
    })

console.log("WebServer is online!");
let count = 0;
setInterval(
    () =>
    require("node-fetch")(process.env.URL).then(() =>
        console.log(`[${++count}] here i pinged ${process.env.URL}`)
    ),
    40000
);
