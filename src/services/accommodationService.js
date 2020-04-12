/* eslint-disable*/
import database from '../database/models';

const { Room } = database;

class accommodationService {
  /**
   * @param {object} room - room object.
   * @returns {object} - created room for accommodation
   */
  static async createRoom(room) {
    try {
      //creates room
      const createdRoom = await Room.create(room);

      return createdRoom;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {id} accommodation - accommodation id.
   * @returns {object} - rooms data
   */
  static async getAllRooms(id) {
    try {
      const data = await Room.findAll({
        where: {
          accommodationId: id
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getRoom(params) {
    try {
      const room = await Room.findOne({
        where: params
      });
      return room;
    } catch (error) {
      throw error;
    }
  }
}

export default accommodationService;
