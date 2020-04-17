/* eslint-disable*/
import database from '../database/models';
import { Op } from 'sequelize/types';

const { Bookings } = database;

/** Class representing BookingService */
class BookingService {
  static async createBooking(booking) {
    try {
      const createdBooking = await Bookings.create(booking);
      return createdBooking;
    } catch (error) {
      throw error;
    }
  }

  static async findBooking(requestId) {
    try {
      const booking = await Bookings.findOne({ where: { requestId } });
      return booking;
    } catch (error) {
      throw error;
    }
  }
  static async updateBooking(requestId, roomId, booking) {
    try {
      const updatedBooking = await Bookings.update(booking, {
        where: { [Op.and]: [{ a: requestId }, { b: roomId }] }
      });
      return updatedBooking;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBooking(requestId, roomId) {
    try {
      const deletedBooking = await Bookings.destroy({
        where: { [Op.and]: [{ a: requestId }, { b: roomId }] }
      });
      return deletedBooking;
    } catch (error) {
      throw error;
    }
  }
}

export default BookingService;
