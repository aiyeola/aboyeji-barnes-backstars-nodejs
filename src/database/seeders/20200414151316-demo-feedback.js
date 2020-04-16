/* eslint-disable*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Feedbacks',
      [
        {
          userId: 49,
          feedback: 'This is a feedback',
          accommodationId: 22,
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
