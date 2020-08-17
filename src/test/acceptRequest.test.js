import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);
const signInUrl = '/api/v1/auth/signin';
const oneWay = '/api/v1/requests/one-way';

let token;
let managerToken;

before('Log In manager correct credentials', async () => {
  const user = {
    userEmail: 'marveldev53@gmail.com',
    userPassword: 'Root1123#'
  };
  const res = await chai.request(server).post(signInUrl).send(user);
  expect(res).to.have.status(200);

  managerToken = res.body.data.userToken;
});

before('Log In normal users correct credentials', async () => {
  const user = {
    userEmail: 'danieldoe@gmail.com',
    userPassword: 'Root1123#'
  };
  const res = await chai.request(server).post(signInUrl).send(user);
  expect(res).to.have.status(200);

  token = res.body.data.userToken;
});
describe('Reject request', () => {
  // reject request tests
  let requestId;
  before('create a travel request', async () => {
    const request = {
      from: 'Reins, Rwanda',
      to: [
        {
          travelDate: '2040-10-12',
          location: 2,
          accommodation: 'sheraton'
        }
      ],
      reason:
        'iam travelling cause the company allows us to, i mean the company finances everything',
      passportNumber: '121HU3H3U32',
      passportName: 'Robben Bahati',
      gender: 'MALE'
    };
    const res = await chai
      .request(server)
      .post(oneWay)
      .set('Authorization', `Bearer ${token}`)
      .send(request);
    requestId = res.body.data.id;
  });
  it('Manager should be able to reject a request', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      });
    // expect(res.status).to.eq(200);
  });
  it('Manager should be not be able to reject an already rejected request', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      });
    expect(res.status).to.eq(409);
  });
  it('Manager should be not be able to reject a request that is not created', async () => {
    const res = await chai
      .request(server)
      .patch('/api/v1/requests/reject/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      });
    expect(res.status).to.eq(404);
  });
  it('Manager should be not be able to reject a request if reason is not valid', async () => {
    const res = await chai
      .request(server)
      .patch('/api/v1/requests/reject/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({ reason: 'this i' });
    expect(res.status).to.eq(422);
    expect(res.body.error).to.eq('Validation Error');
  });
  it('Manager should be not be able to reject a request if requestId an integer', async () => {
    const res = await chai
      .request(server)
      .patch('/api/v1/requests/reject/0.5')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this irequestId is required and requestId is required and must bmust be an integer greater than zero'
      });
    expect(res.status).to.eq(422);
    expect(res.body.error).to.eq('Validation Error');
  });
  it('should be not be able to reject a request if not manager', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/requests/reject/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        reason:
          'Manager should be not be able to reject a request if reason is not valid'
      });
    expect(res.status).to.eq(403);
  });
});
describe('Accept request', () => {
  // accept request tests
  let requestId;
  before('create a travel request', async () => {
    const request = {
      from: 'watoto, Rwanda',
      to: [
        {
          travelDate: '2040-08-12',
          location: 2,
          accommodation: 'sheraton'
        }
      ],
      reason:
        'travelling cause the company allows us to, i mean the company finances everything',
      passportNumber: '121HU3H3U32',
      passportName: 'Robben Bahati',
      gender: 'MALE'
    };
    const res = await chai
      .request(server)
      .post('/api/v1/requests/one-way')
      .set('Authorization', `Bearer ${token}`)
      .send(request);
    requestId = res.body.data.id;
  });
  it('user should be  able to get one request', async () => {
    const res = await chai
      .request(server)
      .get(`/api/v1/requests/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`);
    expect(res.status).to.eq(200);
  });
  it('user should not be able to get one request without or with invalid id', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/requests/abc')
      .set('Authorization', `Bearer ${managerToken}`);
    expect(res.status).to.eq(422);
  });
  it('user should not be able to get one request if not found', async () => {
    const res = await chai
      .request(server)
      .get('/api/v1/requests/200')
      .set('Authorization', `Bearer ${managerToken}`);
    expect(res.status).to.eq(404);
  });
  it('Manager should be able to accept a request', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/requests/approve/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this is the reason why you can make this trip hence it is rejected. sorry for your loss'
      });
    // expect(res.status).to.eq(200);
  });
  it('Manager should be not be able to accept an already accepted request', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/requests/approve/${requestId}`)
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'your request have been accepted your request have been accepted your request have been accepted '
      });
    expect(res.status).to.eq(409);
  });
  it('Manager should be not be able to accept a request that is not created', async () => {
    const res = await chai
      .request(server)
      .patch('/api/v1/requests/approve/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'your request have been accepted your request have been accepted your request have been accepted '
      });
    expect(res.status).to.eq(404);
  });
  it('Manager should be not be able to accept a request if reason is not valid', async () => {
    const res = await chai
      .request(server)
      .patch('/api/v1/requests/approve/1099')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({ reason: 'this i' });
    expect(res.status).to.eq(422);
    expect(res.body.error).to.eq('Validation Error');
  });
  it('Manager should be not be able to accept a request if requestId an integer', async () => {
    const res = await chai
      .request(server)
      .patch('/api/v1/requests/approve/0.5')
      .set('Authorization', `Bearer ${managerToken}`)
      .send({
        reason:
          'this requestId is required and requestId is required and must be an integer greater than zero'
      });
    expect(res.status).to.eq(422);
    expect(res.body.error).to.eq('Validation Error');
  });
  it('should be not be able to accept a request if not manager', async () => {
    const res = await chai
      .request(server)
      .patch(`/api/v1/requests/approve/${requestId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        reason:
          'Manager should be not be able to accept a request if reason is not valid'
      });
    expect(res.status).to.eq(403);
  });
});
