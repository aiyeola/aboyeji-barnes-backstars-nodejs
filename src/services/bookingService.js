// /* eslint-disable*/
// import database from '../database/models';
// import { Op } from 'sequelize/types';
// const Sequelize = require('sequelize');
// const op = Sequelize.Op;
// const operatorsAliases = {
//   $and: op.and,
//   $or: op.or,
// }

// const { Bookings } = database;

// /** Class representing UserService */
// class BookingService {
//   /**
//  /** Class representing BookingService */

//   /**
//    * @param {object} booking - query object
//    * @return {object}
//    */
//   static async createBooking(booking) {
//     try {
//       const createdBooking = await Bookings.create(booking);
//       return createdBooking;
//     } catch (error) {
//       throw error;
//     }
//   }
//   // /**
//   //    * @param {requestId} id - query object
//   //    * @return {object}
//   //    */
//   static async findBooking(requestId) {
//     try {
//       const booking = await Bookings.findAll({
//         where: { requestId: requestId },
//       });
//       return booking;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async updateBooking(id, booking) {
//     console.log("*UJDSJDJ", booking);
//     try {
//      await Bookings.update(booking, {
//         where: { id: id },
//       });
//       const updatedBooking = await Bookings.findOne({
//         where: { id: id },

//   static async updateBooking(requestId, roomId, booking) {
//     try {
//       const updatedBooking = await Bookings.update(booking, {
//         where: { [Op.and]: [{ a: requestId }, { b: roomId }] }

//       });
//       return updatedBooking;
//     } catch (error) {
//       throw error;
//     }
//   }

//   /**
//    * @param {object} booking - query object
//    * @return {object}
//    */
//   static async deleteBooking(id,booking) {
//     try {
//       const deletedBooking = await Bookings.destroy({

//         where: { [op.and]: [{ id: id }, { roomId: booking.roomId }] },

//         where: { [Op.and]: [{ a: requestId }, { b: roomId }] }

//       });
//       return deletedBooking;
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async getAllBookings() {
//     try {
//       const allBookings = await Bookings.findAll();
//       return allBookings;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export default BookingService;
