/* eslint-disable*/
import database from '../database/models';

const { Rooms, Accommodations, Location } = database;

class accommodationService {
  /**
   * @param {object} accommodation - accommodation object.
   * @returns {object} - created accommodation object
   */
  static async createAccommodation(accommodation) {
    try {
      const createdAccommodation = await Accommodations.create(accommodation);

      return createdAccommodation;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @returns {object} - existing accommodation object
   */
  static async getAllAccommodations() {
    try {
      const data = await Accommodations.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {id} params - accommodation integer.
   * @returns {object} -  accommodation object
   */
  static async getAccommodation(params) {
    try {
      const singleAccommodation = await Accommodations.findOne({
        where: [params],
        include: [
          {
            model: Location
          }
        ]
      });
      return singleAccommodation;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {object} room - room object.
   * @returns {object} - created room for accommodation
   */
  static async createRoom(room) {
    try {
      //creates room
      const createdRoom = await Rooms.create(room);

      return createdRoom;
    } catch (error) {
      throw error;
    }
  }

  /**
  //Get all rooms for all accommodations
   * @param {id} room - room id.
   * @returns {object} - rooms data
   */
  static async getAllRooms() {
    try {
      const data = await Rooms.findAll();
      return data;
    } catch (error) {
      throw error;
    }
  }
  /**

    //Get all rooms for an accommodation
   * @param {id} room - room id.
   * @returns {object} - rooms data
   */
  static async getRooms(id) {
    try {
      const data = await Rooms.findAll({
        where: {
          accommodationId: id
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  /**
   * @param {params} params - room fields.
   * @returns {object} - room object
   */
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
  /**
   * @param {id} id - room id
   * * @param {object} data - room object
   * @returns {object} - updated room object
   */
  static async updateRoom(id, data) {
    try {
      await Rooms.update(data, {
        where: { id: id }
        // returning: true
      });
      const updatedRoom = await Rooms.findOne({
        where: { id: id }
      });
      return updatedRoom;
    } catch (error) {
      throw error;
    }
  }
}

export default accommodationService;
