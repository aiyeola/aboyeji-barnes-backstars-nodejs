/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Likes',
      [
        {
          userId: 2,
          accommodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 1,
          accommodationId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          accommodationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 4,
          accommodationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          accommodationId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Likes', null, {})
};
