/* eslint-disable no-else-return */
import chai from 'chai';
import chaiHttp from 'chai-http';
import passport from 'passport';
import index from '../index';
import '../config/passport';
import { response } from 'express';

const server = index.app;
const { expect } = chai;

chai.use(chaiHttp);

const signUpURL = '/api/v1/auth/signup';
const signInURL = '/api/v1/auth/signin';
const signOut = '/api/v1/auth/signout';
const loginWithFacebook = '/api/v1/auth/facebook';
const facebookRedirect = '/api/v1/auth/facebook/redirect';
const loginWithGoogle = '/api/v1/auth/google';
const googleRedirect = '/api/v1/auth/google/redirect';

let token;

const regData = {
  userEmail: 'jonathanaurugai@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root1234@'
};
const regDataWithWrongEmail = {
  userEmail: 'jonathanaurugaigmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root'
};

describe('Create an account', () => {
  it('with valid properties ', async () => {
    const res = await chai.request(server).post(signUpURL).send(regData);
    expect(res.status).to.equal(201);
  });
  it.skip('with wrong Email', (done) => {
    chai
      .request(server)
      .post(signUpURL)
      .send(regDataWithWrongEmail)
      .end((_err, res) => {
        expect(res.status).to.eq(422);
        done();
      });
  });
});

describe.skip('User Login', () => {
  it('with correct credentials', (done) => {
    const user = {
      userEmail: 'jonathanaurugai@gmail.com',
      userPassword: 'Root1234@'
    };
    chai
      .request(server)
      .post(signInURL)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          expect(res).to.have.status(200);
          token = res.body.data;
          done();
        }
      });
  });
});

describe.skip('Users Logout', () => {
  it('when they are logged In', (done) => {
    chai
      .request(server)
      .post(signOut)
      .set('Authorization', `Bearer ${token}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.body.message).to.eq('User logged out successfully');
        expect(res.status).to.eq(200);
        done();
      });
  });
  // it('when they are not logged In', (done) => {
  //   chai
  //     .request(server)
  //     .post(signOut)
  //     .set('Authorization', `Bearer ${token}`)
  //     .send()
  //     .end((_err, res) => {
  //       if (_err) done(_err);

  //       expect(res.body.message).to.eq('User not logged In');
  //       expect(res.status).to.eq(401);
  //       done();
  //     });
  // });

  // it('by passing incorrect token', (done) => {
  //   chai
  //     .request(server)
  //     .post(signOut)
  //     .set('Authorization', 'WrongToken sadasdasdasd')
  //     .send()
  //     .end((_err, res) => {
  //       if (_err) done(_err);

  //       expect(res.body.message).to.eq('Invalid or expired token used');
  //       expect(res.status).to.eq(401);
  //       done();
  //     });
  // });
});
