const User = require('../models/userModel');
// const db = require('../models/db.js');

const userController = {
  getOne(req, res) {

    User
      .findOne({ where: req.params })
      .then((user) => {
        // console.log(user.dataValues);
        if (user.dataValues.password === req.body.password) {
          req.session.user = user;
          res.json('Your user exists!');
        } else {
          res.status(401).send('Your user does not exist!');
        }
      })
      .catch((err) => res.status(500).send(err));
  },

  addOne(req, res) {
    User.create({
      name: req.body.username,
      password: req.body.password
    })
      .then(() => {
        console.log('It works!');
        req.session.user = req.body.user;
        res.status(200).json('Test');
      })
      .catch((err) => {
        console.log('Not working...', err);
        res.status(401).send(err);
      });
  },
    // console.log(req.body);
    // req.session.user = req.body.user;
    // res.send();
    // User
    //   .create(req.body)
    //   .then((user) => {
    //     if (user) {
    //       req.session.user = req.body.user;
    //       res.send(user.dataValues);
    //     } else {
    //       res.status(404).send('That user already exists!')
    //     }
    //   })
    //   .catch((err) => res.status(500).send(err));

  signOut(req, res) {
    req.session = null;
    res.send('Your session has been destroyed!');
  }
  // ,

  // getAll(req, res) {
  //   User
  //     .findAll({})
  //     .then((locations) => res.send(locations))
  //     .catch((err) => res.status(400).send(err));
  // },

  // deleteOne(req, res) {
  //   User
  //     .findOne({ where: req.params })
  //     .then((user) => user.destroy())
  //     .then((data) => res.status(200).send(data))
  //     .catch((err) => res.status(500).send(err));
  // }
};

module.exports = userController;
