import Response from '../utils/response';
import BookingService from '../services/bookingService';
import RequestService from '../services/requestService';

/** Class that handles booking */
class BookingController {
  /**
   * user can book rooms
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @returns {object} custom response
   */
  static async bookRooms(req, res, next) {
    const {
      body: { rooms, checkIn, checkOut },
      params: { id }
    } = req;
    try {
      const books = [];
      for (let count = 0; count < rooms.length; count += 1) {
        books.push({
          requestId: id,
          roomId: rooms[count],
          checkIn: checkIn[count],
          checkOut: checkOut[count]
        });
      }
      // set the request to booked
      await RequestService.markRequestAsBooked(id, true);

      const data = await BookingService.createBooking(books);
      return Response.customResponse(
        res,
        200,
        'You have booked successfully',
        data
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * user can cancel room bookings
   * @param {object} req request object
   * @param {object} res response object
   * @param {object} next next middleware
   * @returns {object} custom response
   */
  static async cancelBooking(req, res, next) {
    const {
      params: { id },
      user: { id: userId }
    } = req;
    try {
      const reqId = parseInt(id, 10);
      const request = await RequestService.findRequest({ id: reqId });
      if (!request) {
        return Response.notFoundError(res, 'Request does not exist');
      }
      if (request.userId !== userId) {
        return Response.authorizationError(res, "You don't own this request");
      }
      await RequestService.updateRequest({ booked: false }, reqId);
      await BookingService.cancelBooking({ requestId: reqId });
      return Response.customResponse(
        res,
        200,
        'Booking cancelled successfully'
      );
    } catch (error) {
      next(error);
    }
  }
}

export default BookingController;
