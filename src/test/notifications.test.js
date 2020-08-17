import chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';

const server = index.app;

const { expect } = chai;
chai.use(chaiHttp);

let managerToken;

const signInUrl = '/api/v1/auth/signin';
const getNotifications = '/api/v1/notifications';
const markOneAsRead = '/api/v1/notifications/mark-as-read?id=1';
const markAllAsRead = '/api/v1/notifications/mark-as-read';

before('Log In manager correct credentials', async () => {
  const user = {
    userEmail: 'marveldev53@gmail.com',
    userPassword: 'Root1123#'
  };
  const res = await chai.request(server).post(signInUrl).send(user);
  expect(res).to.have.status(200);
  managerToken = res.body.data.userToken;
});

describe('Notifications', () => {
  it('should retrieve all', async () => {
    const res = await chai
      .request(server)
      .get(getNotifications)
      .set('Authorization', `Bearer ${managerToken}`)
      .send();
    expect(res.status).to.eq(200);
  });
  it('should mark one notification as read', async () => {
    const res = await chai
      .request(server)
      .patch(markOneAsRead)
      .set('Authorization', `Bearer ${managerToken}`)
      .send();
    expect(res.status).to.eq(200);
  });
  it('should not mark as read if already marked', async () => {
    const res = await chai
      .request(server)
      .patch(markAllAsRead)
      .set('Authorization', `Bearer ${managerToken}`)
      .send();
    expect(res.status).to.eq(200);
  });
});
