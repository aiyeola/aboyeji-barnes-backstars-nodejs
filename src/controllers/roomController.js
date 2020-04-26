/* eslint-disable*/
import Response from '../utils/response';
import accommodationService from '../services/accommodationService';

/** Class that handles rooms */
class Rooms {
  //Get all rooms for an accommodation
  static async getRooms(req, res, next) {
    const accommodationId = req.query.accommodationid;
    try {
      // get accommodation rooms from database
      const data = await accommodationService.getRooms(accommodationId);

      const message = `Rooms for accommodation with the id ${accommodationId}`;

      return Response.customResponse(res, 200, message, data);
    } catch (error) {
      return next(error);
    }
  }

  //Get all rooms for all accommodations
  static async getAllRooms(req, res, next) {
    try {
      // get accommodation rooms from database
      const data = await accommodationService.getAllRooms();

      const message = `Rooms for all accommodations`;

      return Response.customResponse(res, 200, message, data);
    } catch (error) {
      return next(error);
    }
  }
}

export default Rooms;
