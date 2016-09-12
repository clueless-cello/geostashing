const fs = require('fs');
const uuid = require('node-uuid');

const Image = require('../models/imageModel.js');

const mediaDir = './client/public/media/';

const imageController = {

  addOne(req, res) {
    let data = '';

    req.on('data', (newData) => {
      data += newData;
    });

    req.on('end', () => {
      const [imageMeta, imageData] = data.split(',');
      const metaMatch = (/data:image\/(.+);base64/).exec(imageMeta);

      if (!metaMatch) {
        res.status(400).send('incorrect image data sent');
      }

      const filename = `${uuid.v4()}.${metaMatch[1]}`;

      const imageBuffer = new Buffer(imageData, 'base64');

      fs.writeFile(mediaDir + filename, imageBuffer, (err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          Image.create({ url: `/media/${filename}` })
          .then((image) => res.json(image));
        }
      });
    });
  }
};

module.exports = imageController;
