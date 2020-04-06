/* eslint-disable  */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    country: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
  };
  return Location;
};