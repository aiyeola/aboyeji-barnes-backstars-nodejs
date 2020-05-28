/* eslint-disable*/
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Rooms',
      [
        {
          name: 'VIRGINIA',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 3,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'LEKKI',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 1,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'MAITAMA',
          type: '1bedroom',
          status: 'Unavailable',
          accommodationId: 3,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'REST',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 3,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'SUNDOWN',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 3,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'AIR',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 1,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'CRUST',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 1,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'BRET',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 1,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'SPACE',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 2,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'REDID',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 2,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'CROCS',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 2,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'SPAN',
          type: '2bedroom',
          status: 'Available',
          accommodationId: 2,
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rooms', null, {});
  }
};
