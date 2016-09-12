const Product = require('../models/productModel');
const User = require('../models/userModel');
const Location = require('../models/locationModel');
const Image = require('../models/imageModel');

const productController = {
  getAll(req, res) {
    Product.findAll({
      include: [
        Location,
        Image,
        { model: User, as: 'seller' }
      ]
    }).then((products) => res.json(products));
  },

  addOne(req, res) {
    const productData = req.body;

    //for now... until there are sessions
    Promise.resolve()
      .then(() =>
        User.findOne())
      .then((user) =>
        (productData.sellerId = user.id))
      .then(() =>
        req.body.locationId || Location.create(req.body.location))
      .then((location) =>
         (productData.locationId = productData.locationId || location.id))
      .then(() =>
        Product.create(productData))
      .then((product) => {
        res.json(product);
        product.setImages(productData.images);
      }).catch((err) => res.status(400).send(err));
  }
};

module.exports = productController;
