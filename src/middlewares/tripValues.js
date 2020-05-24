/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import Response from '../utils/response';
import locationService from '../services/locationService';
import AccommodationService from '../services/accommodationService';

/** Class representing validation of trip values */
class TripValues {
  /**
   * checks if company works location
   * @param {object} req - request object
   * @param {object} res  - response object
   * @param {object} next - next middlewareThe first number.
   * @returns {object} the request object
   */
  static async isValidLocation(req, res, next) {
    const locations = req.body.to.map((trip) => trip.location);
    // To check that user doesn't provide two locations that are the same
    for (let count = 0; count < locations.length - 1; count += 1) {
      if (locations[count] === locations[count + 1]) {
        return Response.conflictError(
          res,
          'Your next destination must be different'
        );
      }
    }
    const existLocations = (await locationService.getLocations()).map(
      (location) => location.id
    );
    const notLocation = locations.filter(
      (place) => !existLocations.includes(place)
    );
    if (notLocation.length > 0) {
      return Response.notFoundError(
        res,
        'Company does not operate in location'
      );
    }
    req.body.locations = locations;
    next();
  }

  /**
   * Checks if accommodation is valid and available
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} the request object
   */
  static async isValidAccommodation(req, res, next) {
    const accommodations = req.body.to.map((trip) => trip.accommodation);
    const accommodationObject = [];
    req.body.accommodations = [];
    // To check whether the accommodation exists and is available for booking
    for (const name of accommodations) {
      const accommodation = await AccommodationService.getAccommodation({
        name: name.toUpperCase()
      });
      if (!accommodation) {
        return Response.notFoundError(res, 'accommodation doesnot exist');
      }
      if (accommodation.status !== 'Available') {
        return Response.notFoundError(
          res,
          `"${accommodation.name}" is fully booked`
        );
      }
      req.body.accommodations.push(accommodation.id);
      accommodationObject.push(accommodation);
    }

    for (let count = 0; count < accommodationObject.length; count += 1) {
      if (accommodationObject[count].locationId !== req.body.locations[count]) {
        return Response.notFoundError(
          res,
          `"${accommodationObject[count].name}" is not in that location`
        );
      }
    }
    next();
  }

  /**
   * checks if Dates make sense
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} the request object
   */
  static async isValidDates(req, res, next) {
    console.log('req.body', req.body);
    console.log('req.user', req.user);
  }
}
export default TripValues;
