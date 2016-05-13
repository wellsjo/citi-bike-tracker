'use strict'

const csv = require('csv');
const path = require('path');
const fs = require('fs');

let data = fs.readFileSync(path.resolve(__dirname, '..', 'data', 'citibike.csv'));

csv.parse(data, (err, data) => {
  console.log(err, data);
});
