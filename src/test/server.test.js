import chai from 'chai';
import chaiHttp from 'chai-http';

import index from '../index';

const server = index.app;

chai.should();
chai.use(chaiHttp);

describe('Server test', () => {
  it('should handle the unknown routes', async () => {
    const res = await chai
      .request(server)
      .get('/unknownroute')
      .send({ data: 'nothing' });

    res.status.should.equal(404);
  });
});
