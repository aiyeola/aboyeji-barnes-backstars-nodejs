/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from: {
        type: Sequelize.STRING
      },
      travelDate: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      returnDate: {
        type: Sequelize.DATEONLY
      },
      reason: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      passportName: {
        type: Sequelize.STRING
      },
      passportNumber: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      booked: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Requests')
};
