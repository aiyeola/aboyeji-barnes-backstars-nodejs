"use strict";
module.exports = (sequelize, DataTypes,Op) => {
  const Bookings = sequelize.define(
    "Bookings",
    {
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      checkIn: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      checkOut: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {}
  );
  Bookings.associate = function (models) {
    // associations can be defined here
  };
  return Bookings;
};
