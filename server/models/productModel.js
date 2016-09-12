const Sequelize = require('sequelize');
const db = require('./db');

const Location = require('./locationModel');
const User = require('./userModel');
const Image = require('./imageModel');

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

Product.hasMany(Image);
Product.belongsTo(Location, { foreignKey: { allowNull: false } });
Product.belongsTo(User, {
  as: 'seller',
  foreignKey: { allowNull: false }
});

module.exports = Product;
