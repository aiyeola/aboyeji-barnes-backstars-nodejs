import Response from '../utils/response';
import accommodationService from '../services/accommodationService';

/** Class that handles rooms */
class Rooms {
  /**
   *  Gets all rooms
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} custom response
   */
  static async getAllRooms(req, res, next) {
    try {
      const data = await accommodationService.getAllRooms();
      const message = 'Rooms for all accommodations';
      return Response.customResponse(res, 200, message, data);
    } catch (error) {
      return next(error);
    }
  }
}

export default Rooms;
