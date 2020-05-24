/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
const createdAt = new Date();
const updatedAt = new Date();

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Locations',
      [
        {
          country: 'Nigeria',
          city: 'Ibadan',
          createdAt,
          updatedAt
        },
        {
          country: 'Italy',
          city: 'Sicily',
          createdAt,
          updatedAt
        },
        {
          country: 'Sweden',
          city: 'Stockholm',
          createdAt,
          updatedAt
        },
        {
          country: 'England',
          city: 'Manchester',
          createdAt,
          updatedAt
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Locations', null, {})
};
