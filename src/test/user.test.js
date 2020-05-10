/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import passport from 'passport';
import index from '../index';
import '../config/passport';

const server = index.app;
const { expect } = chai;

chai.use(chaiHttp);

const signUpURL = '/api/v1/auth/signup';
const signInURL = '/api/v1/auth/signin';
const createLinkUrl = '/api/v1/auth/create-link';
const verifyLink = '/api/v1/auth/verify/?token=';
const loginWithFacebook = '/api/v1/auth/facebook';
const facebookRedirect = '/api/v1/auth/facebook/redirect';
const loginWithGoogle = '/api/v1/auth/google';
const googleRedirect = '/api/v1/auth/google/redirect';
const requestReset = '/api/v1/auth/forgot-password';
const updateRole = '/api/v1/auth/update-role';
const emailPreferences = '/api/v1/auth/email-preferences';
const unsubscribe = '/api/v1/auth/unsubscribe/?token=';
const checkUser = '/api/v1/auth/check-user';
const signOut = '/api/v1/auth/signout';

let token;
let token1;
let superToken;

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
const regDataWithWrongPassword = {
  userEmail: 'jonathanaurugai@gmail.com',
  firstName: 'Jonathan',
  lastName: 'Aurugai',
  userPassword: 'Root'
};

describe('Create an account', () => {
  it('with valid properties and send an email with verification link', async () => {
    const res = await chai.request(server).post(signUpURL).send(regData);
    token1 = res.body.data.userToken;
    expect(res.body.message).to.equal('Account has been created successfully');
    expect(res.status).to.equal(201);
    expect(res.body.data.verification.message).to.equal(
      'verification link sent'
    );
  });
  it('should not log in if user is not verified', async () => {
    const user = {
      userEmail: 'jonathanaurugai@gmail.com',
      userPassword: 'Root1234@'
    };
    const res = await chai.request(server).post(signInURL).send(user);
    expect(res.status).to.equal(401);
  });
  it('should send a verification link to a registered email', async () => {
    const res = await chai
      .request(server)
      .post(createLinkUrl)
      .send({ userEmail: regData.userEmail });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('email sent with verification link');
    expect(res.body.data.link).to.be.a('string');
  });
  it('should not send a verification link to a unregistered email', async () => {
    const res = await chai
      .request(server)
      .post(createLinkUrl)
      .send({ userEmail: 'unknown@barnes.io' });
    expect(res.status).to.equal(404);
    expect(res.body.message).to.equal('This email is not registered');
  });
  it('should not send a verification if no email is provided', async () => {
    const res = await chai.request(server).post(createLinkUrl).send({});
    expect(res.status).to.equal(422);
  });
  it('should not send a verification if email is invalid', async () => {
    const res = await chai
      .request(server)
      .post(createLinkUrl)
      .send({ userEmail: 'barnes.wrong.io' });
    expect(res.status).to.equal(422);
  });
  it('should not send a verification the email is empty', async () => {
    const res = await chai
      .request(server)
      .post(createLinkUrl)
      .send({ userEmail: '' });
    expect(res.status).to.equal(422);
  });
  it('should verify an email via verification link', async () => {
    const res = await chai.request(server).patch(`${verifyLink}${token1}`);
    expect(res.status).to.equal(201);
  });
  it('should give an error if an email is already verified', async () => {
    const res = await chai.request(server).patch(`${verifyLink}${token1}`);
    expect(res.status).to.equal(409);
    expect(res.body.message).to.equal('Email already verified');
  });
  it('should give error when token is not provided', async () => {
    const res = await chai.request(server).patch(`${verifyLink}`);
    expect(res.status).to.equal(422);
  });
  it('should give error when token is invalid or expired', async () => {
    const res = await chai.request(server).patch(`${verifyLink}expiredtokenw`);
    expect(res.status).to.equal(401);
  });
  it('should give error when the token secret is invalid', async () => {
    process.env.TOKEN = 'ASGDKASJHD';
    const res = await chai.request(server).patch(`${verifyLink}${token1}`);
    expect(res.status).to.equal(409);
  });
  it('with wrong Password', async () => {
    const res = await chai
      .request(server)
      .post(signUpURL)
      .send(regDataWithWrongPassword);
    expect(res.status).to.equal(422);
  });
  it('with wrong Email', async () => {
    const res = await chai
      .request(server)
      .post(signUpURL)
      .send(regDataWithWrongEmail);
    expect(res.status).to.equal(422);
  });
});

describe('User Login', () => {
  it('with correct credentials', async () => {
    const user = {
      userEmail: 'jonathanaurugai@gmail.com',
      userPassword: 'Root1234@'
    };
    const res = await chai.request(server).post(signInURL).send(user);
    expect(res).to.have.status(200);
    token = res.body.data.userToken;
  });
  it('with wrong email', async () => {
    const user = {
      userEmail: 'eoorrr@stations.com',
      userPassword: 'Root1234@'
    };
    const res = await chai.request(server).post(signInURL).send(user);
    expect(res.status).to.equal(401);
  });
  it('with wrong password', async () => {
    const user = {
      userEmail: 'jonathanaurugai@gmail.com',
      userPassword: 'R@123123sajhgsd'
    };
    const res = await chai.request(server).post(signInURL).send(user);
    expect(res.status).to.equal(401);
  });
  it('with empty email field', async () => {
    const user = {
      userEmail: '',
      userPassword: 'R@123123sd'
    };
    const res = await chai.request(server).post(signInURL).send(user);
    expect(res.status).to.equal(422);
  });
  it('with empty password field', async () => {
    const user = {
      userEmail: 'jonathanaurugai@gmail.com',
      userPassword: ''
    };
    const res = await chai.request(server).post(signInURL).send(user);
    expect(res.status).to.equal(422);
  });
});

describe.skip('Login and create user via facebook account', () => {
  it('redirects to facebook', async () => {
    const res = await chai.request(server).get(loginWithFacebook);
    // console.log(res);
  });
  it('Should add user', async () => {
    const strategy = passport._strategies.facebook;
    strategy._token_response = {
      access_token: 'at-1234',
      expires_in: 3600
    };

    strategy._profile = {
      id: 1234,
      provider: 'facebook',
      _json: {
        first_name: 'Jonathan',
        last_name: 'Shyaka'
      },
      emails: [{ value: 'jonathanshyaka@example.com' }]
    };
    const res = await chai.request(server).get(facebookRedirect);

    res.redirects[0].should.contain(
      'api/v1/auth/facebook/redirect?__mock_strategy_callback=true'
    );
  });
});

describe.skip('Login and create user via google account', () => {
  it('redirects to google', async () => {
    const res = await chai.request(server).get(loginWithGoogle);
    console.log(res);
    res.redirects[0].should.contain(
      'api/v1/auth/google/redirect?__mock_strategy_callback=true'
    );
  });
  it('Should add user', async () => {
    const strategy = passport._strategies.google;
    strategy._token_response = {
      access_token: 'at-1234',
      expires_in: 3600
    };

    strategy._profile = {
      id: 1234,
      provider: 'google',
      _json: {
        given_name: 'Jonathan',
        family_name: 'Shyaka'
      },
      emails: [{ value: 'jonathanshyaka@example.com' }]
    };
    const res = await chai.request(server).get(googleRedirect);

    res.redirects[0].should.contain(
      'api/v1/auth/google/redirect?__mock_strategy_callback=true'
    );
  });
});

describe('Request reset password', () => {
  it('Sends reset password email', async () => {
    const existUser = { email: regData.userEmail };
    const res = await chai.request(server).post(requestReset).send(existUser);
    expect(res.body.message).to.equal(
      'If email is found, check your email for the link'
    );
    expect(res.status).to.equal(200);
  });
  it('should not reset password if email is not found', async () => {
    const notUser = { email: 'joneuuuuuathanaurugai@gmail.com' };
    const res = await chai.request(server).post(requestReset).send(notUser);
    expect(res.body.message).to.equal('Account not found');
    expect(res.status).to.equal(404);
  });
});

describe.skip('Test Access', () => {
  describe('Super Administrator', () => {
    before(async () => {
      const superUser = {
        userEmail: 'johndoe@gmail.com',
        userPassword: 'Root1123#'
      };
      const res = await chai.request(server).post(signInURL).send(superUser);
      superToken = res.body.data.userToken;
    });
    it('with valid properties', async () => {
      const res = await chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'jonathanaurugai@gmail.com', userRole: 'Manager' });
      expect(res.status).to.equal(200);
    });
    it('with valid properties and transferring manager rights', async () => {
      const res = await chai
        .request(server)
        .put(updateRole)
        .set('Authorization', `Bearer ${superToken}`)
        .send({ userEmail: 'josephdoe@gmail.com', userRole: 'Manager' });
      expect(res.status).to.eq(200);
    });
  });
});

describe('Email Preferences', () => {
  it('can opt out of email notifications from email', async () => {
    const res = await chai.request(server).patch(`${unsubscribe}${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.data.emailAllowed).to.equal(false);
  });
  it('should not opt out if already opted out', async () => {
    const res = await chai.request(server).patch(`${unsubscribe}${token}`);
    expect(res.status).to.equal(409);
  });
  it('should update user email preferences', async () => {
    const res = await chai
      .request(server)
      .patch(emailPreferences)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.data.emailAllowed).to.equal(true);
  });
  it('should return user details', async () => {
    const res = await chai
      .request(server)
      .get(checkUser)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).to.equal(200);
  });
});

describe.skip('User Should Logout', () => {
  it('when they are logged In', async () => {
    const res = await chai
      .request(server)
      .post(signOut)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res.body.message).to.equal('User logged out successfully');
    expect(res.status).to.equal(200);
  });
  it('when they are not logged In', async () => {
    const res = await chai
      .request(server)
      .post(signOut)
      .set('Authorization', `Bearer ${token}`)
      .send();
    expect(res.body.message).to.equal('User not logged In');
    expect(res.status).to.equal(401);
  });
  it('by passing incorrect token', async () => {
    const res = await chai
      .request(server)
      .post(signOut)
      .set('Authorization', 'Bearer sadasdasdasd')
      .send();
    expect(res.body.message).to.equal('Invalid or expired token used');
    expect(res.status).to.equal(401);
  });
});
