'use strict'

const fs = require('fs');
const path = require('path');
const citibike = require('./lib/citibike');
const schedule = require('node-schedule').scheduleJob;

let datasrc = path.resolve(__dirname, 'data', 'data.json');
let cache = require(datasrc);

// save bike data every 5 minutes
schedule('*/5 * * * *', _ => {
  citibike.getSystem('citi-bike-nyc', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      cache = cache.concat(data);
      console.log(Date.now().toJSON(), data.length);
      fs.writeFileSync(datasrc, JSON.stringify(data));
    }
  });
})
