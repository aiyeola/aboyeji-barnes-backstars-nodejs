/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import ChatService from '../services/chatService';
import Emitter from '../utils/eventEmitter';

/** Class handling chats */
class ChatController {
  /**
   * saves a chat message
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @returns {object} custom response
   */
  async saveMessage(req, res, next) {
    const {
      user: { id: userId, firstName, lastName },
      body: { message }
    } = req;
    try {
      const data = {
        userId,
        userName: `${firstName} ${lastName}`,
        message
      };
      const newMessage = await ChatService.saveMessage(data);
      await Emitter.emit('new chat', newMessage.dataValues);
      return Response.customResponse(
        res,
        201,
        'Message added successfully',
        newMessage
      );
    } catch (error) {
      return next(error);
    }
  }

  /**
   * gets all chat messages
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @returns {object} custom response
   */
  async getMessages(req, res, next) {
    const { firstName, lastName } = req.user;
    try {
      const message = await ChatService.getMessages();
      return Response.customResponse(
        res,
        200,
        'Messages fetched successfully',
        {
          name: `${firstName} ${lastName}`,
          message
        }
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default new ChatController();
