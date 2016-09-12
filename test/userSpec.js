const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server.js');
const expect = chai.expect;

chai.use(chaiHttp);

describe('user api endpoint (/api/users)', () => {
  describe('login', () => {
    xit('should log in a user and set session');
    xit('should show a descriptive error if unable to login');
    xit('');
  });
  describe('get user', () => {
    xit('should get all users (/api/users)');

    it('should get a single user (/api/users/:name)', (done) => {
      chai.request(server)
        .get('/api/users/testOne')
        .then((res) => {
          res.should.have.status(200);
          done();
        }).catch(done);
    });

    xit('should return an error if the user doesn\'t exist');

    xit('should respond with an object when getting user', (done) => {
      chai.request(server)
        .get('/api/users/testOne')
        .then((res) => {
          res.should.be.json;
          res.should.be.an('object');
          done();
        }).catch(done);
    });
  });

  describe('signup', () => {
    it('should create and return a new user (/api/users)',
      (done) => {
        chai
          .request(server)
          .post('/api/users')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({ name: 'testUser' }))
          .then((res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            done();
          })
          .catch(done);
      });

    xit('should return a descriptive error if user is unable to sign up');

    it('should persist user data',
      (done) => {
        chai
          .request(server)
          .get('/api/users/testUser')
          .then((res) => {
            res.body.should.be.an('object');
            expect(res.body.name).to.equal('testUser');
            done();
          })
          .catch(done);
      });
  });

  describe('delete user', () => {
    it('should a user with name queried (DELETE /api/users/:name)', (done) => {
      chai.request(server)
        .delete('/api/users/testUser')
        .then((res) => {
          res.should.have.status(200);
          res.body.should.eql([]);
          done();
        }).catch(done);
    });
  });
});
