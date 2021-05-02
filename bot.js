let Discord;
let Databace
if (typeof window !==unidentified"){
Discord=DiscordJS
 Database = EasyDatabase;
 } else {
 Discord = require("discord.js")
 //how Ironic
 //leveling next I think
 //stop duplecating code me
 Database = require("easy-json-database");
 }
 const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
 //uper line from the XPT progect on github thankyou for it beeing open source.
 const s4d = {
    Discord,
    client: null,
    //also from the XPT progect on github
    tokenInvalid: false
    reply: null
    joiningMeber: null
     database: new Database("./db.json"),
     //XPT progect github
      checkMessageExists() {
        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
    }
};
s4d.client = new s4d.Discord.Client({
    fetchAllMembers: true
});
s4d.client.on('raw', async (packet) => {
    if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
        if (!guild) return;
        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
        if (!member) return;
        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
        if (!channel) return;
        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
        if (!message) return;
        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
    }
});
var member_xp, member_level;


s4d.client.login('0DV4IAZlUNClQi1dMUwc7y_rlA6L6XM_').catch((e) => {
    s4d.tokenInvalid = true;
    s4d.tokenError = e;
});

s4d.client.on('message', async (s4dmessage) => {
    if (!((s4dmessage.member).user.bot)) {
        member_xp = s4d.database.get(String(('xp-' + String(s4dmessage.author.id))));
        member_level = s4d.database.get(String(('level-' + String(s4dmessage.author.id))));
        if (!member_xp) {
            member_xp = 0;
        } else if (!member_level) {
            member_level = 0;
        }
        s4d.database.set(String(('xp-' + String(s4dmessage.author.id))), (member_xp + 1));
        member_xp = member_xp + 1;
        if (member_xp > 100) {
            s4d.database.set(String(('level-' + String(s4dmessage.author.id))), (member_level + 1));
            member_level = member_level + 1;
            s4dmessage.channel.send(String((['Congratulations, ', s4dmessage.member, 'you jumped to level ', member_level, '!!'].join(''))));
        }
        if ((s4dmessage.content) == '!level') {
            s4dmessage.channel.send(String(([s4dmessage.member, ', you are currently level: ', member_level].join(''))));
        } else if ((s4dmessage.content) == '!xp') {
            s4dmessage.channel.send(String(([s4dmessage.member, ', you need ', 100 - member_xp, ' to jump to level ', member_level + 1].join(''))));
        }
    }

});

s4d;
