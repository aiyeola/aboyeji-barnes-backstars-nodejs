import Response from '../utils/response';
import locationService from '../services/locationService';

/** Class representing Location Controller */
class Location {
  /**
   * Request to get a location by its id and the response
   * @param {object} req - request object
   * @param {onject} res - response object
   * @param {function} next - next middleware function
   * @returns {object} response object
   */
  static async getLocationById(req, res, next) {
    const { id } = req.body;
    try {
       // Get location from database
      const location = await locationService.getLocationById(id);

      const message = `Location with id ${id}`;
      return Response.customResponse(res, 200, message, location);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Request to get all location by its id and the response
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next middleware function
   * @returns {object} response object
   */
  static async getAllLocations(req, res, next) {
    try {
      // Get all locations from database
      const locations = await locationService.getAllLocations();

      const message = 'All current locations';
      return Response.customResponse(res, 200, message, locations);
    } catch (error) {
      return next(error);
    }
  }
}

export default Location;
