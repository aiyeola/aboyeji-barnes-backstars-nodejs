/* eslint-disable*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'AccommodationRequests',
      [
        {
          requestId: 2,
          accommodationId: 13,
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
