const db = require('../models/db');

//models
const User = require('../models/userModel');
const Location = require('../models/locationModel');

//fixtures
const UserFixtures = require('./fixtures/users.json');
const LocationFixtures = require('./fixtures/locations.json');

//options
const force = process.argv.includes('--force');
const fixtures = process.argv.includes('--fixtures');

const addFixtures = () =>
  Promise.resolve().then(() =>
    console.log('ADDING FIXTURES...')
  ).then(() =>
    console.log('CREATING LOCATIONS')
  ).then(() =>
    User.bulkCreate(UserFixtures)
  ).then(() =>
    console.log('CREATING USERS')
  ).then(() =>
    Location.bulkCreate(LocationFixtures)
  );

console.log('SYNCING', force
  ? 'FORCEFULLY'
  : 'NON-FORCEFULLY');

Promise.resolve().then(() =>
  console.log('SYNCING USER SCHEMA')
).then(() =>
  User.sync({ force })
).then(() =>
  console.log('SYNCING LOCATION SCHEMA')
).then(() =>
  Location.sync({ force })
).then(() =>
  fixtures && addFixtures()
).then(() =>
  db.close()
).catch((err) =>
  console.log('MIGRATION ERROR:', err)
);
