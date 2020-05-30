/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Feedbacks',
      [
        {
          userId: 1,
          feedback: 'I enjoyed my stay, salubrious',
          accommodationId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 3,
          feedback: 'Fantastic experience',
          accommodationId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 4,
          feedback: 'I loved the fire view',
          accommodationId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 2,
          feedback: 'Enjoyed using the gym',
          accommodationId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          userId: 4,
          feedback: 'I loved the fire view',
          accommodationId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Feedbacks', null, {})
};
