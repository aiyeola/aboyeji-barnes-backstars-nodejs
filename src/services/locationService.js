import database from '../database/models';

// console.log(database)
const { Location } = database;

/** Class representing LocationService */
class LocationService {
  /**
   * Creates a new Location.
   * @param {object} loc - location object.
   * @returns {object} - created location object
   */
  static async createLocation(loc) {
    try {
      const newLocation = await Location.create(loc);
      return newLocation;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets location based on its id
   * @param {number} locationId location id should be an integer.
   * @return {object} - location with specified id
   */
  static async getLocationById(locationId) {
    try {
      // Find location based on primary key (id)
      const location = await Location.findByPk(locationId);
      return location;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets either all locations or location(s) based on a query parameter
   * @param {object} query - query object
   * @return {object} - an array of Location objects
   */
  static async getLocations(query) {
    try {
      // const locations = await Location.findAll();
      // return locations;
      const result = await Location.find({ where: { query } });
      return result;
    } catch (error) {
      throw error;
    }
  }

  // /**
  //  * Search for location based on query parameters
  //  * @param {object} query - query object
  //  * @return {object} - location
  //  */
  // static async searchRequest(query) {
  //   try {
  //     const result = await Location.find({ where: { query } });
  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

export default LocationService;
