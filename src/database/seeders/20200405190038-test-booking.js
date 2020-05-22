'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
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
          roomId: 200,
          checkIn: new Date(),
          checkOut: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Bookings', null, {});
  }
};
