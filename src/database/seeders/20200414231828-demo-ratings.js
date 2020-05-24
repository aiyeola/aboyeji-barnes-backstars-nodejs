/* eslint-disable*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Ratings',
      [
        {
          userId: 1,
          accommodationId: 2,
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          accommodationId: 1,
          rating: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          accommodationId: 3,
          rating: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ratings', null, {});
  }
};
