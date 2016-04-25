'use strict'

const config = require('../config');
const twilio = require('twilio');
const client = twilio(config.sid, config.authtoken);

module.exports = msg => {
  client.messages.create({
    body: msg,
    to: '+14157068928',
    from: config.number
  }, (err, message) => {
    console.log(err, message);
  });
};
