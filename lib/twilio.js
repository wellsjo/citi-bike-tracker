'use strict'

const config = require('../config');
const twilio = require('twilio');

const sms = twilio(config.sid, config.authtoken);

client.messages.create({
  body: 'hello world',
  to: config.number,
  from: config.number
}, (err, message) => {
  console.log(err, message);
});
