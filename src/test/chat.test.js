import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);

let token;

const signInUrl = '/api/v1/auth/signin';
const postMessage = '/api/v1/chat';

const correctMsg = {
  message: 'this is home what is home'
};

const wrongMsg = {
  message: 11223334
};

describe('Chat message', () => {
  before('Log In normal users correct credentials', async () => {
    const user = {
      userEmail: 'danieldoe@gmail.com',
      userPassword: 'Root1123#'
    };
    const res = await chai.request(server).post(signInUrl).send(user);
    expect(res).to.have.status(200);
    token = res.body.data.userToken;
  });
  it('should add message', async () => {
    const res = await chai
      .request(server)
      .post(postMessage)
      .set('Authorization', `Bearer ${token}`)
      .send(correctMsg);
    expect(res.status).to.eq(201);
  });
  it('should not add message', async () => {
    const res = await chai
      .request(server)
      .post(postMessage)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongMsg);
    expect(res.status).to.eq(422);
  });
});
