import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

chai.use(chaiHttp);

const { expect } = chai;

const signInUrl = '/api/v1/auth/signin';
const rateUrl = '/api/v1/accommodations';

let user1Token;
let user2Token;

const user1 = {
  userEmail: 'danieldoe@gmail.com',
  userPassword: 'Root1123#'
};

const user2 = {
  userEmail: 'johndoe@gmail.com',
  userPassword: 'Root1123#'
};
before('LogIn user1', async () => {
  const res = await chai.request(server).post(signInUrl).send(user1);
  user1Token = res.body.data.userToken;
});

before('LogIn user2', async () => {
  const res = await chai.request(server).post(signInUrl).send(user2);
  user2Token = res.body.data.userToken;
});

describe('Rate accommodation', () => {
  it('User has stayed in facility', async () => {
    const rating = {
      rating: 4
    };
    const res = await chai
      .request(server)
      .post(`${rateUrl}/2/ratings`)
      .set('Authorization', `Bearer ${user1Token}`)
      .send(rating);
    // console.log('res: ', res);
    // expect(res).to.have.status(201);
    // expect(res.body.data.rating).eq(4);
  });

  it('User has has not stayed in facility', async () => {
    const rating = {
      rating: 4
    };
    const res = await chai
      .request(server)
      .post(`${rateUrl}/1/ratings`)
      .set('Authorization', `Bearer ${user2Token}`)
      .send(rating);
    expect(res).to.have.status(403);
  });

  it('User rates a facility not available', async () => {
    const rating = {
      rating: 4
    };
    const res = await chai
      .request(server)
      .post(`${rateUrl}/1021/ratings`)
      .set('Authorization', `Bearer ${user2Token}`)
      .send(rating);
    expect(res).to.have.status(404);
  });

  it('User enters string as  rating', async () => {
    const rating = {
      rating: 'sadsada'
    };
    const res = await chai
      .request(server)
      .post(`${rateUrl}/1/ratings`)
      .set('Authorization', `Bearer ${user1Token}`)
      .send(rating);
    expect(res).to.have.status(422);
  });

  it('User enters decimal as  rating', async () => {
    const rating = {
      rating: 1.22
    };
    const res = await chai
      .request(server)
      .post(`${rateUrl}/1/ratings`)
      .set('Authorization', `Bearer ${user1Token}`)
      .send(rating);
    expect(res).to.have.status(422);
  });
});
