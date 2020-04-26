/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define(
    'Rooms',
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      accommodationId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      price: DataTypes.FLOAT
    },
    {}
  );
  Rooms.associate = (models) => {
    // associations can be defined here
  };
  return Rooms;
};
