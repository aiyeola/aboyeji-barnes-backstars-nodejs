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
     * @param {number} id location id should be an integer.
     * @return {object} - location with specified id
     */
    static async getLocationById(id) {
        try {
            // Find location based on primary key (id)
            const location = await Location.findByPk(id);
            return location;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Gets all locations
     * @return {object} - an array of Location objects
     */
    static async getAllLocations() {
        try {
            const locations = await Location.findAll();
            return locations;
        } catch (error) {
            throw error;
        }
    }
}

export default LocationService;
