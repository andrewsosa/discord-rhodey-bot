// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const axios = require('axios');
const {DateTime} = require('luxon');

module.exports = async (channel_id) => {
  const ds = DateTime.now().setZone('America/New_York').toFormat('yyyy-LL-dd');
  const dailyThreadTitle = `[D2] Daily Reset Thread [${ds}]`;
  console.log(dailyThreadTitle);

  const resp = await axios('https://api.reddit.com/user/DTG_Bot/submitted');

  const posts = resp.data.data.children;
  const {data: dailyThread} = posts.find(
    (post) => post.data.title === dailyThreadTitle
  );

  const sections = dailyThread.selftext.split('---').map((s) => s.trim());


  const misc = sections.find((s) => s.startsWith('#Misc'));
  const gunsmith = sections.find((s) => s.startsWith('#Guns'));

  const trimMisc = (section) => {
    let [title, content] = section.split('\n\n');
    content = content.replace("&amp;", "&").replace("\n *", "\n\t*");
    content = content.split('\n').slice(0,3).join('\n');
    return ['Misc Daily', content].join('\n\n');
  };

  const trimGunsmith = (section) => {
    const [title, subheading, shop, ...rest] = section.split('\n\n');    
    const mods = shop.split('\n').slice(0,4);
    return ["Armor & Weapon Mods", mods.join('\n')].join('\n\n');
  };
  
  const quoteContent = (content) => {
    return content.split('\n').map(s => '> ' + s).join('\n');
  }

  const highlights = quoteContent([
    `**${dailyThreadTitle}**`,
    // trimMisc(misc),
    trimGunsmith(gunsmith),
  ].join('\n\n'))

  await lib.discord.channels['@0.0.2'].messages.create({
    channel_id: channel_id,
    content: [
      "Here's today's highlights:",
      highlights,
      "See the full thread here: " + dailyThread.url
    ].join('\n\n'),
  });
};
