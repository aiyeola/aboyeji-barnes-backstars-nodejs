/* eslint-disable func-names */
/* eslint-disable no-undef */
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    'Likes',
    {
      userId: DataTypes.INTEGER,
      accommodationId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  Likes.associate = function (models) {
    // associations can be defined here
  };
  return Likes;
};
