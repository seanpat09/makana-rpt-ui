const chai = require('chai');
const expect = chai.expect;
const url = `http://localhost:4000`;
const request = require('supertest')(url);
const queries = require('./queries');

const queryTest = (query, token = '') =>
  request
    .post('/')
    .set(token.length > 0 ? { Authorization: `Bearer ${token}` } : {})
    .send({
      query
    })
    .expect(200);

describe('API Integration', () => {
  let token;
  let user;
  let publicComment;
  let privateComment;

  describe('Authentication', () => {
    it('can login with valid credentials', done => {
      const query = queries.login('developer@example.com', 'nooneknows');

      queryTest(query).end((err, res) => {
        if (err) return done(err);

        expect(res.body.data.login.user.name).to.equal('Sarah');

        token = res.body.data.login.token;
        user = res.body.data.login.user;

        done();
      });
    });

    it('can not login with invalid credentials', done => {
      const query = queries.login('FOO', 'BAR');

      queryTest(query).end((err, res) => {
        if (err) return done(err);

        expect(res.body.data).to.be.null;

        done();
      });
    });

    it('can get token', () => {
      expect(token).to.not.be.undefined;
    });
  });

  describe('Comments', () => {
    describe('Logged In', () => {
      it('can create public comment', done => {
        const date = new Date();
        const message = `public message: ${date.getTime()}`;
        const query = queries.createComment(message, 'true');

        queryTest(query, token).end((err, res) => {
          if (err) return done(err);

          const returnedComment = res.body.data.createComment;

          expect(returnedComment.isPublic).to.equal(true);
          expect(returnedComment.author.id).to.equal(user.id);
          expect(returnedComment.message).to.equal(message);
          expect(
            new Date(returnedComment.createdAt).getTime()
          ).to.be.greaterThan(date.getTime());

          publicComment = returnedComment;

          done();
        });
      });

      it('can create private comment', done => {
        const date = new Date();
        const message = `private message: ${date.getTime()}`;
        const query = queries.createComment(message, 'false');

        queryTest(query, token).end((err, res) => {
          if (err) return done(err);

          const returnedComment = res.body.data.createComment;

          expect(returnedComment.isPublic).to.equal(false);
          expect(returnedComment.author.id).to.equal(user.id);
          expect(returnedComment.message).to.equal(message);
          expect(
            new Date(returnedComment.createdAt).getTime()
          ).to.be.greaterThan(date.getTime());

          privateComment = returnedComment;

          done();
        });
      });

      it('can query public comment', done => {
        const query = queries.comment(publicComment.id);

        queryTest(query, token).end((err, res) => {
          if (err) return done(err);

          expect(res.body.data.comment.id).to.equal(publicComment.id);

          done();
        });
      });

      it('can query private comment', done => {
        const query = queries.comment(privateComment.id);

        queryTest(query, token).end((err, res) => {
          if (err) return done(err);

          expect(res.body.data.comment.id).to.equal(privateComment.id);

          done();
        });
      });
    });

    describe('Anonymous', () => {
      it('can query comment', done => {
        const query = queries.comment(publicComment.id);

        queryTest(query).end((err, res) => {
          if (err) return done(err);

          expect(res.body.data.comment.id).to.equal(publicComment.id);

          done();
        });
      });

      it('can not query private comment', done => {
        const query = queries.comment(privateComment.id);

        queryTest(query).end((err, res) => {
          if (err) return done(err);

          expect(res.body.data.comment).to.be.null;

          done();
        });
      });
    });

    it('can not query invalid comment', done => {
      const query = queries.comment('BOGUS_ID');

      queryTest(query).end((err, res) => {
        if (err) return done(err);

        expect(res.body.data.comment).to.be.null;

        done();
      });
    });
  });

  it('me without token rejected', done => {
    const query = `{
      me {
          id
        }
      }`;

    queryTest(query).end((err, res) => {
      if (err) return done(err);

      expect(res.body.errors[0].message).to.equal('Not authorized');
      done();
    });
  });
});
