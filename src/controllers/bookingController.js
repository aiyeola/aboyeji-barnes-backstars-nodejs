/* eslint-disable class-methods-use-this */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import Response from '../utils/response';
import bookingService from '../services/bookingService';

/** Class that handles user */
class BookingController {
  /**
   
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next middleware function
   * @returns {object} response object
   */
  async createBooking(req, res, next) {
    const rawData = req.body;
    try {
      const data = await bookingService.createBooking(rawData);
      return Response.customResponse(
        res,
        '201',
        'Booking created successfully',
        data
      );
    } catch (error) {
      return next(error);
    }
  }

  async getAllBookings(req, res, next) {
    try {
      const data = await bookingService.getAllBookings();
      return Response.customResponse(res, '200', 'Query Successfully', data);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next middleware function
   * @returns {object} response object
   */
  async findBooking(req, res, next) {
    const requestId = parseInt(req.params.id);
    console.log('*************************************', requestId);
    try {
      const data = await bookingService.findBooking(requestId);
      if (data == null) {
        return Response.notFoundError(res, 'data not found');
      } else {
        return Response.customResponse(res, '200', 'Query Successful', data);
      }
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next middleware function
   * @returns {object} response object
   */
  async updateBooking(req, res, next) {
    const id = parseInt(req.params.id);
    const rawData = req.body;
    try {
      const data = await bookingService.updateBooking(id, rawData);
      if (data == null) {
        return Response.notFoundError(res, 'data not found');
      } else {
        return Response.customResponse(
          res,
          '201',
          'Booking updated Successfully',
          data
        );
      }
    } catch (error) {
      return next(error);
    }
  }

  async deleteBooking(req, res, next) {
    const id = parseInt(req.params.id);
    const rawData = req.body;
    try {
      const data = await bookingService.deleteBooking(id, rawData);
      if (data == 0) {
        return Response.notFoundError(res, 'data not found');
      } else {
        return Response.customResponse(
          res,
          '200',
          'Booking deleted Successfully',
          data
        );
      }
    } catch (error) {
      return next(error);
    }
  }
  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {function} next - next middleware function
   * @returns {object} response object
   */
}

export default new BookingController();
