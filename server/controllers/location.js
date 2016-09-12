const Location = require('../models/locationModel');

const locationController = {
  getAll(req, res) {
    Location.findAll({})
      .then((locations) => res.send(locations))
      .catch((err) => res.status(400).send(err));
  },

  addOne(req, res) {
    if ((typeof req.body !== 'object')
        || typeof req.body.name !== 'string'
        || typeof req.body.lng !== 'string'
        || typeof req.body.lat !== 'string') {
      res.status(400).send('Not enough data to create new location.');

      return;
    }

    Location.create(req.body)
      .then(() => res.end())
      .catch((err) => res.status(500).send(err));
  },

  deleteOne (req, res) {
    Location
      .findOne({ where: req.params })
      .then((location) => location.destroy())
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(500).send(err));

  }

};

module.exports = locationController;
