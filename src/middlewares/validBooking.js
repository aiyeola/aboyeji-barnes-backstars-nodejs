/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-loop-func */
/* eslint-disable operator-linebreak */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import moment from 'moment';
import Response from '../utils/response';
import RequestService from '../services/requestService';
import BookingService from '../services/bookingService';
import AccommodationService from '../services/accommodationService';

/** Class representing validation of booking values */
class ValidBooking {
  /**
   * Checks if request is valid
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} augmented response object
   */
  static async isRequestValid(req, res, next) {
    const {
      params: { id },
      user: { id: userId }
    } = req;
    const reqId = parseInt(id, 10);
    const request = await RequestService.findRequest({ id: reqId });
    if (!request) {
      return Response.notFoundError(res, 'Request does not exist');
    }
    if (request.userId !== userId) {
      return Response.authorizationError(res, "You don't own this request");
    }
    if (request.status !== 'Approved') {
      return Response.badRequestError(res, 'Request is not approved');
    }
    const booked = await BookingService.getBooking({ requestId: reqId });
    if (booked) {
      return Response.conflictError(
        res,
        `You booked ${booked.roomId} between ${booked.checkIn} and ${booked.checkOut} already`
      );
    }
    req.body.travelDates = request.travelDate;
    req.body.returnDate = request.returnDate;
    req.body.locationIds = request.accommodations.map(
      (place) => place.locationId
    );
    req.body.accommodations = request.accommodations.map((place) => place.id);

    next();
  }

  /**
   * Checks if accommodation is in a location
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} augmented response object
   */
  static async isAccommodationInLocation(req, res, next) {
    const { locationIds } = req.body;
    const newAccommodationObj = [];
    const newAccommodations = req.body.booking.map(
      (hotel) => hotel.accommodation
    );

    if (newAccommodations[0] !== undefined) {
      req.body.accommodations = [];

      for (const name of newAccommodations) {
        const accommodation = await AccommodationService.getAccommodation({
          name: name.toUpperCase()
        });
        if (!accommodation) {
          return Response.notFoundError(res, "Accommodation doesn't exist");
        }
        if (accommodation.status !== 'Available') {
          return Response.badRequestError(
            res,
            `${accommodation.name} is fully booked`
          );
        }
        req.body.accommodations.push(accommodation.id);
        newAccommodationObj.push(accommodation);
      }

      for (let count = 0; count < newAccommodationObj.length; count += 1) {
        if (newAccommodationObj[count].locationId !== locationIds[count]) {
          return Response.notFoundError(
            res,
            `"${newAccommodationObj[count].name}" is not in that location`
          );
        }
      }
    }

    next();
  }

  /** checks if room is in accommodation and available.
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} augmented response object
   */
  static async isValidRoom(req, res, next) {
    const { accommodations } = req.body;
    const roomObject = [];
    const rooms = req.body.booking.map((book) => book.room);
    if (accommodations.length !== rooms.length) {
      return Response.badRequestError(
        res,
        'Book one room for each accommodation'
      );
    }
    for (const id of rooms) {
      const room = await AccommodationService.getRoom({ id });
      if (!room) {
        return Response.notFoundError(res, `"room ${id}" doesn't exist`);
      }
      if (room.status !== 'Available') {
        return Response.conflictError(res, `"room ${id}" is booked`);
      }
      roomObject.push(room);
    }

    for (let num = 0; num < roomObject.length; num += 1) {
      if (!accommodations.includes(roomObject[num].accommodationId)) {
        return Response.notFoundError(
          res,
          `"${roomObject[num].id}" is not in the accommodation`
        );
      }
    }
    req.body.rooms = rooms;

    next();
  }

  /** checks if check in date and checkout date don't collide
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} augmented response object
   */
  static async validCheckInOut(req, res, next) {
    const { travelDates, returnDate } = req.body;
    const checkIns = req.body.booking.map((book) => book.checkIn);
    const checkOuts = req.body.booking.map((book) => book.checkOut);
    if (moment(travelDates[0]).isAfter(checkIns[0]) === true) {
      return Response.badRequestError(
        res,
        'Check in date must be after travel date'
      );
    }
    if (
      returnDate !== undefined &&
      moment(checkOuts[checkOuts.length - 1]).isAfter(returnDate) === true
    ) {
      return Response.badRequestError(
        res,
        'Your last check out is past your return date'
      );
    }

    for (let num = 0; num < checkIns.length; num += 1) {
      const checkIn = moment(checkIns[num], 'YYYY-MM-DD');
      const travelDate = moment(travelDates[num], 'YYYY-MM-DD');
      if (checkIn.diff(travelDate, 'days') > 2) {
        return Response.badRequestError(
          res,
          'You must check in with in two days after your travel date'
        );
      }
      if (moment(checkOuts[num]).isSameOrBefore(checkIns[num]) === true) {
        return Response.badRequestError(
          res,
          `Your checkout date ${checkOuts[num]} must be greater than check in date`
        );
      }
      if (
        moment(checkOuts[num]).isSameOrAfter(travelDates[num + 1]) === true &&
        travelDates[num + 1] !== undefined
      ) {
        return Response.badRequestError(
          res,
          `Your ${checkOuts[num]} checkout date is past with your next travel date`
        );
      }
      if (
        moment(checkIns[num + 1]).isSameOrBefore(checkIns[num]) === true &&
        checkIns[num + 1] !== undefined
      ) {
        return Response.badRequestError(
          res,
          'Your next check in date must be greater'
        );
      }
    }
    req.body.checkIn = checkIns;
    req.body.checkOut = checkOuts;

    next();
  }

  /**
   * Checks if room is free
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next middleware
   * @returns {object} response
   */
  static async isRoomFree(req, res, next) {
    const { rooms } = req.body;
    const checkOuts = req.body.checkOut;
    const checkIns = req.body.checkIn;
    let i = 0;
    for (const id of rooms) {
      const booking = await BookingService.getBookings({ roomId: id });
      const booked = booking.filter(
        (book) =>
          (moment(checkIns[i]).isSameOrAfter(book.checkIn) &&
            moment(checkIns[i]).isSameOrBefore(book.checkOut)) ||
          (moment(checkOuts[i]).isSameOrAfter(book.checkIn) &&
            moment(checkOuts[i]).isSameOrBefore(book.checkOut))
      );
      if (booked.length > 0) {
        return Response.conflictError(
          res,
          `room ${id} is booked between ${booked[0].checkIn} & ${booked[0].checkOut}`
        );
      }
      i += 1;
    }

    next();
  }
}

export default ValidBooking;
