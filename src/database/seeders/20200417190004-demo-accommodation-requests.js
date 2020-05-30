/* eslint-disable*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'AccommodationRequests',
      [
        {
          requestId: 1,
          accommodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requestId: 2,
          accommodationId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requestId: 3,
          accommodationId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requestId: 2,
          accommodationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          requestId: 2,
          accommodationId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('AccommodationRequests', null, {});
  }
};
