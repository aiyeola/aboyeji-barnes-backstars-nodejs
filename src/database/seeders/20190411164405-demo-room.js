/* eslint-disable*/
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.bulkInsert('Room', [ {
            name: "test",
            type: "test",
            accommodationId: "1",
            status: true,
            price: 100,
            createdAt: new Date(),
            updatedAt: new Date()
        } ], {});

    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.bulkDelete('Room', null, {});

    }
};
