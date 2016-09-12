const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');

chai.use(chaiHttp);

describe('product api endpoint (/api/products)', () => {
  describe('get all products', () => {
    it('should return json from GET /api/products', (done) => {
      chai.request(server)
        .get('/api/products').then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        }).catch(done);
    });

    it('should return an array from GET /api/products', (done) => {
      chai.request(server)
        .get('/api/products').then((res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        }).catch(done);
    });
  });

  //waiting for user auth system
  xdescribe('create product', () => {
    it('should POST to /api/products', (done) => {
      const newProduct = {
        name: 'test',
        description: 'a test product',
        price: '12.34',
        location: {
          name: 'test',
          lng: '12.3',
          lat: '12.123'
        }
      };

      chai.request(server)
        .post('/api/products')
        .send(newProduct)
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.name.should.equal(newProduct.name);
          res.body.description.should.equal(newProduct.description);
          res.body.price.should.equal(newProduct.price);
          res.body.should.include.keys(['sellerId', 'locationId']);
          done();
        }).catch((res) => console.log(res) || done(res));
    });

    it('should reject empty POSTs', (done) => {
      const newProduct = {};

      chai.request(server)
        .post('/api/products')
        .send(newProduct)
        .then(done)
        .catch((res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should reject POSTs with invalid data', (done) => {
      const newProduct = {
        this: 'is not',
        real: 'data'
      };

      chai.request(server)
        .post('/api/products')
        .send(newProduct)
        .then(done)
        .catch((res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should reject POSTs without location', (done) => {
      const newProduct = {
        name: 'test',
        description: 'a test product',
        price: '12.34'
      };

      chai.request(server)
        .post('/api/products')
        .send(newProduct)
        .then(done)
        .catch((res) => {
          res.should.have.status(400);
          done();
        });
    });

    xit('should reject POSTs without user logged in');
  });

  describe('get one product (/api/products/:id)', () => {
    xit('should GET product', (done) => {
      chai.request(server)
        .get('/api/products/test')
        .then((res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        }).catch(done);
    });
    xit('should not get GET with invalid id');
    xit('should not get GET with nonexistant id');
  });
});
