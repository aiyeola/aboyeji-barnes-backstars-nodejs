/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Bookings',
      [
        {
          requestId: 1,
          roomId: 1,
          checkIn: new Date(),
          checkOut: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requestId: 2,
          roomId: 2,
          checkIn: new Date(),
          checkOut: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requestId: 3,
          roomId: 3,
          checkIn: new Date(),
          checkOut: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requestId: 4,
          roomId: 4,
          checkIn: new Date(),
          checkOut: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Bookings', null, {})
};
