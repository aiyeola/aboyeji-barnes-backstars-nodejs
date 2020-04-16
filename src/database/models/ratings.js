/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define(
    'Ratings',
    {
      userId: DataTypes.INTEGER,
      accommodationId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER
    },
    {}
  );
  Ratings.associate = function (models) {
    // associations can be defined here
  };
  return Ratings;
};
