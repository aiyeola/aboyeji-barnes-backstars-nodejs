export default (sequelize, DataTypes) => {
  const Bookings = sequelize.define(
    'Bookings',
    {
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Requests',
          key: 'id'
        }
      },
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Rooms',
          key: 'id'
        }
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
  Bookings.associate = (models) => {
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
