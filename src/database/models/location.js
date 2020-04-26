/* eslint-disable no-undef */

export default (sequelize, DataTypes) => {
  const Location = sequelize.define(
    'Location',
    {
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ['[a-zA-Z]+$', 'i']
        }
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ['[a-zA-Z]+$', 'i']
        }
      }
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  Location.associate = (models) => {
    // associations can be defined here
  };
  return Location;
};
