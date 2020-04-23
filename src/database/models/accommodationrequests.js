/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

module.exports = (sequelize, DataTypes) => {
  const AccommodationRequests = sequelize.define(
    'AccommodationRequests',
    {
      requestId: DataTypes.INTEGER,
      accommodationId: DataTypes.INTEGER
    },
    {}
  );
  AccommodationRequests.associate = (models) => {
    // associations can be defined here
  };

  return AccommodationRequests;
};
