import database from '../database/models';

const { Chats } = database;

/** Class representing chat services. */
class chatService {
  /**
   * Creates a new message.
   * @param {object} message details of a message.
   * @returns {object} new message.
   */
  static async saveMessage(message) {
    try {
      return await Chats.create(message);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all messages not deleted
   * @returns {object} all messages not deleted
   */
  static async getMessages() {
    try {
      return await Chats.findAll({
        where: { deleted: false }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * sets a message delete property to true
   * @returns {object} all messages that are deleted
   */
  static async deleteMessages() {
    try {
      return await Chats.update(
        {
          deleted: true
        },
        {
          where: { deleted: false }
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default chatService;
