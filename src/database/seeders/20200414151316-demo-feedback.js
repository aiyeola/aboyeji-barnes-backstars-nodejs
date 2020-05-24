/* eslint-disable*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
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
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Feedbacks', null, {});
  }
};
