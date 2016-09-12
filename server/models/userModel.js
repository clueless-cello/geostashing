const Sequelize = require('sequelize');
const db = require('./db');

const Location = require('./locationModel');

const User = db.define('user', {
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
  }
});

User.hasMany(Location, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
});

module.exports = User;
