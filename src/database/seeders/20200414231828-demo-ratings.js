/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
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
          userId: 1,
          accommodationId: 3,
          rating: 2,
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
          userId: 4,
          accommodationId: 4,
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          accommodationId: 3,
          rating: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Ratings', null, {})
};
