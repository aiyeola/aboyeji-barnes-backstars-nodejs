import Emitter from '../eventEmitter';
import app from './socket';

const onlineUsers = new Set();

export const newMessage = async () => {
  await Emitter.on('new chat', async (chat) => {
    app.io.emit('chat-message', chat);
  });
};

export const addOnline = async () => {
  await Emitter.on('new-user', async (user) => {
    const { firstName, lastName } = user;
    const onlineUser = `${firstName} ${lastName}`;
    onlineUsers.add(onlineUser);
    app.io.emit('online-users', Array.from(onlineUsers));
  });
};
