'use strict'

const fs = require('fs');
const http = require('superagent');
const baseurl = 'http://api.citybik.es';
const citibike = {};

citibike.getNetworks = cb => {
  http
    .get(`${baseurl}/networks.json`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      cb(err, res.body);
    });
}

citibike.getSystem = (system, cb) => {
  http
    .get(`${baseurl}/${system}.json`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      cb(err, res.body);
    });
}

citibike.getStations = (ids, cb) => {
  citibike.getSystem('citi-bike-nyc', (err, res) => {
    let stations = res.filter(st => ids.indexOf(st.id) > -1);
    cb(err, stations);
  });
};

module.exports = citibike;
