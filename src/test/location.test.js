import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;
const { expect } = chai;

chai.use(chaiHttp);

describe('Locations', () => {
  it('should fetch all locations', async () => {
    const res = await chai.request(server).get('/api/v1/locations');
    expect(res.status).to.equal(200);
  });
});
