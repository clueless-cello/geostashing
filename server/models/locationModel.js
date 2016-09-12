const Sequelize = require('sequelize');
const db = require('./db');

const totalNumLength = 9;
const decimalPlaces = 6;

const Location = db.define('location', {
  id: {
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  lat: {
    type: Sequelize.DECIMAL(totalNumLength, decimalPlaces),
    allowNull: false
  },
  lng: {
    type: Sequelize.DECIMAL(totalNumLength, decimalPlaces),
    allowNull: false
  }
});

module.exports = Location;
