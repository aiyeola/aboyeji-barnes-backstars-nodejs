import database from '../database/models';

const {
  Rooms,
  Accommodations,
  Location,
  Likes,
  Feedbacks,
  Users,
  ProfilePictures,
  Ratings,
  Requests
} = database;

/** Class that handles accommodation service */
class accommodationService {
  /**
   * creates a new accommodation
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
   * get an accommodation by a parameter
   * @param {id} params to check by
   * @returns {object} accommodation object
   */
  static async getAccommodation(params) {
    try {
      const singleAccommodation = await Accommodations.findOne({
        where: [params],
        include: [
          {
            model: Rooms,
            as: 'rooms'
          },
          {
            model: Location
          },
          {
            model: Likes,
            as: 'like'
          },
          {
            model: Feedbacks,
            include: [
              {
                model: Users,
                include: [
                  {
                    model: ProfilePictures
                  }
                ]
              }
            ]
          },
          {
            model: Requests,
            as: 'requests'
          },
          {
            model: Ratings,
            as: 'rating'
          }
        ]
      });
      return singleAccommodation;
    } catch (error) {
      throw error;
    }
  }

  /**
   * create a room for an accommodation
   * @param {object} room - room details
   * @returns {object} - created room for accommodation
   */
  static async createRoom(room) {
    try {
      const createdRoom = await Rooms.bulkCreate(room);
      return createdRoom;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all rooms
   * @returns {object} - all room data
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
   * get a room by parameter
   * @param {params} params to find by
   * @returns {object} - room object
   */
  static async getRoom(params) {
    try {
      const room = await Rooms.findOne({
        where: params
      });
      return room;
    } catch (error) {
      throw error;
    }
  }
}

export default accommodationService;
