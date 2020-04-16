import Response from '../utils/response';
import locationService from '../services/locationService';

/** Class representing Location Controller */
class Location {
  /**
   * Request to get a location by its id and the response
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next middleware function
   * @returns {object} response object
   */
  static async getLocationById(req, res, next) {
    const { locationId } = req.params;
    try {
      // Get location from database
      const location = await locationService.getLocationById(locationId);

      const message = `Location with id ${locationId}`;
      return Response.customResponse(res, 200, message, location);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Request to get all locations or location(s) by search parameters
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next middleware function
   * @returns {object} response object
   */
  static async getLocations(req, res, next) {
    let query = {};
    if (req.query.city || req.query.state) {
      query = req.query;
    }
    try {
      // Get all locations from database
      const locations = await locationService.getLocations(query);

      const message = 'Locations found';
      return Response.customResponse(res, 200, message, locations);
    } catch (error) {
      return next(error);
    }
  }

  //  /**
  //  * Request to get all location by its id and the response
  //  * @param {object} req - request object
  //  * @param {object} res - response object
  //  * @param {function} next - next middleware function
  //  * @returns {object} response object
  //  */
  // static async searchRequest(req, res, next) {
  //   let query = {};
  //   if (req.query.city || req.query.state) {
  //     query = req.query;
  //   }
  //   try {
  //     // Get all locations from database
  //     const locations = await locationService.searchRequest(query);

  //     const message = 'Search found';
  //     return Response.customResponse(res, 200, message, locations);
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
}

export default Location;
