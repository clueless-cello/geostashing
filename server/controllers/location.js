const Location = require('../models/locationModel');
const https = require('https');
const mapsApiKey = 'AIzaSyC1LzP_Enai38ao4P2ZIVbbgbPCpPuvxQA';
const mapsApiHost = 'maps.googleapis.com';

const locationController = {
  getAll(req, res) {
    Location.findAll({})
      .then((locations) => res.send(locations))
      .catch((err) => res.status(400).send(err));
  },

  addOne(req, res) {
    Location.create(req.body)
      .then(() => res.end())
      .catch((err) => res.status(400).send(err));
  },

  deleteOne(req, res) {
    Location
      .findOne({ where: req.params })
      .then((location) => location.destroy())
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));
  },

  suggestions(req, res) {
    const requestApiEndpoint
      = '/maps/api/place/autocomplete/json'
      + `?key=${mapsApiKey}`
      + `&input=${encodeURIComponent(req.body.search)}`;

    const options = {
      host: mapsApiHost,
      path: requestApiEndpoint
    };

    const suggestionReq = https.request(options, (apiRes) => {
      let apiResData = '';

      apiRes.on('data', (data) => {
        apiResData += data;
      });

      apiRes.on('end', () => {
        apiResData = JSON.parse(apiResData)
          .predictions.map((pred) =>
            ({ label: pred.description, value: pred.place_id }));
        res.json(apiResData);
      });
    });

    suggestionReq.end();
  },

  details(req, res) {
    const requestApiEndpoint
      = '/maps/api/place/details/json'
      + `?key=${mapsApiKey}`
      + `&placeid=${encodeURIComponent(req.body.id)}`;

    const options = {
      host: mapsApiHost,
      path: requestApiEndpoint
    };

    const detailsReq = https.request(options, (apiRes) => {
      let apiResData = '';

      apiRes.on('data', (data) => {
        apiResData += data;
      });

      apiRes.on('end', () => {
        try {
          res.json(JSON.parse(apiResData).result.geometry.location);
        } catch (err) {
          res.status(400).end();
        }
      });
    });

    detailsReq.end();
  }
};

module.exports = locationController;
