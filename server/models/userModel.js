const db = require('./db');

const User = db.sequelize.define('user',
  {
    id: {
      type: db.Sequelize.UUID,
      primaryKey: true,
      defaultValue: db.Sequelize.UUIDV4
    },
    name: {
      type: db.Sequelize.STRING,
      unique: true
    }
  });


User.sync({ force: true })
  .then(() =>
    User.create({ name: 'testOne' })
  )
  .then((user) => {
    console.log('User table create with test user: ', user.dataValues);
  })
  .catch((err) => {
    console.log('User table could not be created. Error: ', err);
  });

module.exports = User;
