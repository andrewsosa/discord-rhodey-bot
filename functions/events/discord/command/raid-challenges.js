const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const challenges = require('../../scheduler/weekly-challenges.js');

module.exports = async (context) => {
  await challenges(context);  
}


