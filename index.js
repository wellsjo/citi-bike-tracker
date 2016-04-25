'use strict'

const citibike = require('./lib/citibike');
const schedule = require('node-schedule').scheduleJob;

// schedule('* * * * *', _ => {

  citibike.getStations([209], (err, res) => {
    console.log(res[0].bikes);
  });

  citibike.getSystem('citi-bike-nyc', (err, data) => {

  });

// });
