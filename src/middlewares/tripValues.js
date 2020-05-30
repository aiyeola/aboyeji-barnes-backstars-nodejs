/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import moment from 'moment';
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
        return Response.notFoundError(res, "Accommodation doesn't exist");
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
   * checks if dates make sense
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} the request object
   */
  static async isValidDates(req, res, next) {
    const { returnDate } = req.body;
    const travelDates = req.body.to.map((trip) => trip.travelDate);
    if (moment().isAfter(travelDates[0]) === true) {
      return Response.badRequestError(
        res,
        'Travel Dates have to be greater than today'
      );
    }

    if (returnDate !== undefined) {
      if (
        moment(travelDates[travelDates.length - 1]).isAfter(returnDate) === true
      ) {
        return Response.badRequestError(
          res,
          'Return Date has to be greater than travel date'
        );
      }
    }

    if (travelDates.length > 1) {
      for (let date = 0; date < travelDates.length - 1; date += 1) {
        if (moment(travelDates[date]).isAfter(travelDates[date + 1]) === true) {
          return Response.badRequestError(
            res,
            'The travel dates have to be greater'
          );
        }
      }
    }

    req.body.travelDates = travelDates;
    next();
  }
}
export default TripValues;
