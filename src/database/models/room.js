/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      accommodationId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      price: DataTypes.FLOAT
    },
    {}
  );
  Room.associate = (models) => {
    // associations can be defined here
  };
  return Room;
};
