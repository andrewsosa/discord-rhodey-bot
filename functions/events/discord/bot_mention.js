// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const send = async (event, context, message) => {
  await lib.discord.channels['@0.0.2'].messages.create({
    channel_id: `${event.channel_id}`,
    content: message,
  });
};

/**
 * An HTTP endpoint that acts as a webhook for Discord message.create event
 * @param {object} event
 * @returns {any} result
 */
module.exports = async (event, context) => {
  const {DEFAULT_GUILD_ID} = process.env;
  
  const rhodeyface = `<:rhodeyface:748645818118045797>`;
  const ascendantrhodey = `<:ascendant_rhodey:889627761218560030>`;
  
  const responseEmote = (Math.floor(Math.random() * 2) == 0) ? rhodeyface : ascendantrhodey;

  // mentions which rhodey can respond to
  const actions = {
    'please create the sesh events': async () => {
      await send(event, context, `no`);
    },
  };

  // iterate actions and execute
  let found = false;
  for (const [trigger, action] of Object.entries(actions)) {
    console.log(trigger, action);
    if (event.content.includes(trigger)) {
      found = true;
      try {
        await action();
      } catch (e) {
        await send(
          event,
          context,
          [`oopsie whoopsie`, '```', `${e}`, '```'].join('\n')
        );
      }
    }
  }

  if (!found) {
    await send(event, context, `${rhodeyface}`);
  }

  return;
};
