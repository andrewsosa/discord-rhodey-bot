const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const createRaidEvents = require('../../../actions/create-raid-events');

module.exports = async (context) => {
  const {DEFAULT_GUILD_ID, VOICE_CHANNEL_ID, SESH_CHANNEL_ID} = process.env;
  await createRaidEvents(DEFAULT_GUILD_ID, VOICE_CHANNEL_ID, SESH_CHANNEL_ID);
};
