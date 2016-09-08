const Sequelize = require('sequelize');
const db = require('./db');

const Location = require('./locationModel');
const User = require('./userModel.js');

const currencyDecimalPlaces = 2;
const maxCurrencyLength = 10;

const Product = db.define('product', {
  id: {
    type: Sequelize.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(maxCurrencyLength, currencyDecimalPlaces),
    allowNull: false
  }
});

Product.belongsTo(Location);
Product.belongsTo(User, { as: 'seller' });

module.exports = Product;
