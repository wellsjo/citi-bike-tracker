'use strict'

const config = require('./config');
const users = require('./config/profiles.json');
const text = require('./lib/text');
const citibike = require('./lib/citibike');
const schedule = require('node-schedule').scheduleJob;

let sent = false;

schedule('* * * * *', _ => {

  let now = Number([new Date().getHours(), new Date().getMinutes()].join(''));
  citibike.getSystem('citi-bike-nyc', (err, data) => {

    users.forEach(user => {

      user.profiles.forEach(profile => {

        if (profile.start > now || profile.end < now) {
          return;
        }

        let stations = data.filter(s => profile.stations.indexOf(s.id) > -1);
        let bikes = stations.reduce((p, c) => p + c.bikes, 0);

        console.log(bikes + ' bikes left');
        if (bikes < profile && !sent) {
          text(bikes + ' bikes left downtown');
          sent = true;
        }
      });
    });
  });
})
