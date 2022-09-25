// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const d2 = require('@andrewsosa/destiny2api');

module.exports = async (context) => {
  const client = d2.makeClient(process.env.BUNGIE_API_KEY);
  const challenges = [];
  
  for (const [abbr, id] of  Object.entries(d2.RAID_IDS)) {
    let challengeName = await d2.getRaidChallengeName(client, id);    
    challenges.push(`This week's ${abbr} challenge is **${challengeName}**.`)
  }
  
  await lib.discord.channels['@0.0.2'].messages.create({
    channel_id: `${process.env.RAID_CHANNEL_ID}`,
    content: challenges.join('\n'),
  });    
};

// https://discord.com/oauth2/authorize?client_id=616754792965865495&permissions=67628096&scope=bot
