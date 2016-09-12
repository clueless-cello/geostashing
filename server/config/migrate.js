const db = require('../models/db');

//models
const User = require('../models/userModel');
const Location = require('../models/locationModel');
const Product = require('../models/productModel');
const Image = require('../models/imageModel');

//fixtures
const UserFixtures = require('./fixtures/users.json');
const LocationFixtures = require('./fixtures/locations.json');
const ProductFixtures = require('./fixtures/products.json');
const ImageFixtures = require('./fixtures/images.json');

//options
const force = process.argv.includes('--force');
const fixtures = process.argv.includes('--fixtures');

const addFixtures = () =>
  Promise.resolve().then(() =>
    console.log('ADDING FIXTURES...')
  ).then(() =>
    console.log('CREATING LOCATIONS') || User.bulkCreate(UserFixtures)
  ).then(() =>
    console.log('CREATING USERS') || Location.bulkCreate(LocationFixtures)
  ).then(() =>
    console.log('CREATING PRODUCTS') || Product.bulkCreate(ProductFixtures)
  ).then(() =>
    console.log('CREATING IMAGES') || Image.bulkCreate(ImageFixtures)
  );

console.log('SYNCING', force
  ? 'FORCEFULLY'
  : 'NON-FORCEFULLY');

Promise.resolve().then(() =>
  console.log('SYNCING USER SCHEMA') || User.sync({ force })
).then(() =>
  console.log('SYNCING LOCATION SCHEMA') || Location.sync({ force })
).then(() =>
  console.log('SYNCING PRODUCT SCHEMA') || Product.sync({ force })
).then(() =>
  console.log('SYNCING IMAGE SCHEMA') || Image.sync({ force })
).then(() =>
  fixtures && addFixtures()
).then(() =>
  db.close()
).catch((err) =>
  console.log('MIGRATION ERROR:', err)
);
