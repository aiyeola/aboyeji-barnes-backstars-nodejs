import database from '../database/models';

const { Location, Accommodations } = database;

/** Class representing LocationService */
class LocationService {
  /**
   * Gets location based on its id
   * @param {number} locationId location id should be an integer.
   * @return {object} - location with specified id
   */
  static async getLocationById(locationId) {
    try {
      const location = await Location.findByPk(locationId);
      return location;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Gets all locations
   * @return {object} - an array of Location objects
   */
  static async getLocations() {
    try {
      const result = await Location.findAll({
        include: [
          {
            model: Accommodations
          }
        ]
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default LocationService;
