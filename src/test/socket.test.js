import chai from 'chai';
import io from 'socket.io-client';

const { expect } = chai;

describe('Sockets unit tests', () => {
  let socket;

  beforeEach((done) => {
    socket = io.connect('http://localhost:4000', {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true
    });
    socket.on('connect', () => {
      done();
    });
    socket.on('disconnect', () => {});
  });

  afterEach((done) => {
    if (socket.connected) {
      socket.disconnect();
    }
    done();
  });

  describe('New user login and is online', () => {
    it('test new user', async () => {
      await socket.emit('new-user', 'donald trump');
      await socket.on('online-users', (user) => {
        expect(user).to.equal(['donald trump']);
      });
    });

    it('test sending data', async () => {
      const data = {
        userName: 'donald',
        message: 'Hi'
      };
      await socket.emit('send-message', data);
      await socket.on('chat-message', (message) => {
        expect(message).to.equal('donald: Hi');
      });
    });
  });
});
