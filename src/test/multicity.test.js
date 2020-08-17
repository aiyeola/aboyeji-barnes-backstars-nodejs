import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import Requests from '../controllers/requestController';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);

let token;
const signInUrl = '/api/v1/auth/signin';
const multiCity = '/api/v1/requests/multi-city';

const req = {
  user: {
    id: 1
  },
  body: {
    from: 'Central, Cental',
    to: [1, 2],
    accommodations: ['hotel', 'Sheraton'],
    travelDate: [4, 'date'],
    returnDate: '2040-12-02',
    reason:
      'jormi joromi i want you to joromi joromi kilode kilode wo why treat me o baby joromi',
    passportNumber: '121HU3H3U32',
    passportName: 'Robben Bahati',
    gender: 'MALE'
  }
};
const multi = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 'sheraton'
    },
    {
      travelDate: '2040-11-22',
      location: 1,
      accommodation: 'hotel'
    }
  ],
  returnDate: '2040-12-02',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything so why not',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE'
};

const wrongAccommodation = {
  from: 'Kigali, Rwanda',
  to: [
    {
      travelDate: '2040-11-12',
      location: 2,
      accommodation: 'sheraton'
    },
    {
      travelDate: '2040-11-22',
      location: 1,
      accommodation: 'rental'
    }
  ],
  returnDate: '2040-12-02',
  passportNumber: '121HU3H3U32',
  passportName: 'Robben Bahati',
  gender: 'MALE',
  reason:
    'iam travelling cause the company allows us to, i mean the company finances everything'
};

describe('Multi city Request', () => {
  before('with correct credentials', async () => {
    const user = {
      userEmail: 'danieldoe@gmail.com',
      userPassword: 'Root1123#'
    };
    const res = await chai.request(server).post(signInUrl).send(user);
    token = res.body.data.userToken;
  });
  it('User should post a request multi city', async () => {
    const res = await chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(multi);
    expect(res.status).to.eq(200);
  });
  it('User should not request multi city with accommodation not existing', async () => {
    const res = await chai
      .request(server)
      .post(multiCity)
      .set('Authorization', `Bearer ${token}`)
      .send(wrongAccommodation);
    expect(res.status).to.eq(404);
  });
});

describe('Database Validation', () => {
  it('Should allow only valid travel dates in database', (done) => {
    const res = {};
    Requests.trip(req, res, (error) => {
      expect(error.errors[0].message).to.eq(
        'Date of format YYYY-MM-DD allowed.'
      );
    });
    done();
  });
});
