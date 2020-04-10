'use strict';
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        accomodationId: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        price: DataTypes.FLOAT
    }, {});
    Room.associate = function (models) {
        // associations can be defined here
    };
    return Room;
};