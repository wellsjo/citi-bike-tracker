'use strict'

const config = require('./config');
const text = require('./lib/text');
const citibike = require('./lib/citibike');
const schedule = require('node-schedule').scheduleJob;

let sent = false;

schedule('* * * * *', _ => {
  citibike.getSystem('citi-bike-nyc', (err, data) => {
    let stations = data.filter(s => config.ids.indexOf(s.id) > -1);
    let bikes = stations.reduce((p, c) => p + c.bikes, 0);
    console.log(bikes);
    if (bikes < 10 && !sent) {
      text(bikes + ' bikes left downtown');
      sent = true;
    }
  });
})
