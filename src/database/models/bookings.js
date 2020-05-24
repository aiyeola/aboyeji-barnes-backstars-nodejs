/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Bookings = sequelize.define(
    'Bookings',
    {
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      checkIn: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },

      checkOut: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    },
    {}
  );
  Bookings.associate = function (models) {
    Bookings.belongsTo(models.Rooms, {
      onDelete: 'CASCADE',
      foreignKey: 'roomId'
    });
    Bookings.belongsTo(models.Requests, {
      onDelete: 'CASCADE',
      foreignKey: 'requestId'
    });
  };
  return Bookings;
};
