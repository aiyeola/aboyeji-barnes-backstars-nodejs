/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Rooms',
      [
        {
          name: 'Virginia',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 3,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lekki',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 1,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Maitama',
          type: '1bedroom',
          status: 'Unavailable',
          accommodationId: 3,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Rest',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 3,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Sundown',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 3,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Air',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 1,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Crust',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 1,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bret',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 1,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Space',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 2,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Redid',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 2,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Crocs',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 2,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Span',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 2,
          price: 2000,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Rooms', null, {})
};
