const Sequelize = require('sequelize');
const db = require('./db');

const Image = db.define('image', {
  id: {
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Image;
