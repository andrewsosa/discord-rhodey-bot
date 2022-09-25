const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const { DateTime } = require("luxon");

module.exports = async (guildId, voiceChannelId, textChannelId) => {
  const now = DateTime.now().setZone("America/New_York");
  
  let friNight = now.set({ weekday: 5, hour: 20, minute: 0 });
  if (now > friNight) friNight = friNight.plus({ weeks: 1 });
  
  let satNight = now.set({ weekday: 6, hour: 20, minute: 0 });
  if (now > satNight) satNight = satNight.plus({ weeks: 1 });
  
  const friday = await lib.discord.scheduledevents['@0.0.1'].create({
    guild_id: `${guildId}`,
    name: `Friday Night Raid`,
    scheduled_start_time: friNight.toString(),
    channel_id: `${voiceChannelId}`,
    privacy_level: 'GUILD_MEMBERS',
    entity_type: 'VOICE'
  });
  
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${textChannelId}`,
    content: `Here's Friday's event: https://discord.com/events/${guildId}/${friday.id}`,
  });

  const saturday = await lib.discord.scheduledevents['@0.0.1'].create({
    guild_id: `${guildId}`,
    name: `Saturday Night Raid`,
    scheduled_start_time: satNight.toString(),
    channel_id: `758699174866321432`,
    privacy_level: 'GUILD_MEMBERS',
    entity_type: 'VOICE'
  });
  
  await lib.discord.channels['@0.3.2'].messages.create({
    channel_id: `${textChannelId}`,
    content: `Here's Saturday's event: https://discord.com/events/${guildId}/${saturday.id}`,
  });
};