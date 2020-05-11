import Response from '../utils/response';
import database from '../database/models';

const { Rooms, Location } = database;

/** Class representing validation of booking values */
class ValidBooking {
  /**
   * Checks if accommodation  is in a location
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isAccommodationInLocation(req, res, next) {
    try {
      const result = await Location.findOne({
        where: { id: req.body.locationId }
      });
      if (result === null) {
        return Response.customResponse(
          res,
          '201',
          'Location specified does not exist'
        );
      }
      next();
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Checks if room is free
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isRoomFree(req, res, next) {
    try {
      const result = await Rooms.findOne({
        where: { id: req.body.roomId }
      });
      if (result.status === false) {
        return Response.customResponse(res, '201', 'Room is not free');
      }
      next();
    } catch (error) {
      return next(error);
    }
  }
}

export default ValidBooking;
