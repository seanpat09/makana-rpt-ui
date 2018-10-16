const chai = require('chai');
const expect = chai.expect;
const url = `http://localhost:4000`;
const request = require('supertest')(url);

const queryTest = query =>
  request
    .post('/')
    .send({
      query: `{ ${query} }`
    })
    .expect(200);

describe('GraphQL', () => {
  it('query valid comment', done => {
    const query = `
        comment(id: "cjnawdli2trrj0b77jpjrbzbj") {
          id
          message
          createdAt
        }`;

    const response = {
      data: {
        comment: {
          id: 'cjnawdli2trrj0b77jpjrbzbj',
          message: 'testing testing 1 2 3 4 5',
          createdAt: '2018-10-15T22:55:55.418Z'
        }
      }
    };

    queryTest(query).end((err, res) => {
      if (err) return done(err);

      expect(res.body).to.have.deep.equals(response);
      done();
    });
  });

  it('query invalid comment', done => {
    const query = `
      comment(id: "bogus") {
          id
        }`;

    const response = {
      data: {
        comment: null
      }
    };

    queryTest(query).end((err, res) => {
      if (err) return done(err);

      expect(res.body).to.have.deep.equals(response);
      done();
    });
  });

  it('me without token rejected', done => {
    const query = `
      me {
          id
        }`;

    queryTest(query).end((err, res) => {
      if (err) return done(err);

      expect(res.body.errors[0].message).to.equal('Not authorized');
      done();
    });
  });
});
