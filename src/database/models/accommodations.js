/* eslint-disable no-unused-vars */
/* eslint-disable arrow-parens */
/* eslint-disable no-undef */

export default (sequelize, DataTypes) => {
  const Accommodations = sequelize.define(
    'Accommodations',
    {
      name: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'Available',
        validate: {
          isIn: {
            args: [['Available', 'Unavailable']],
            msg: 'Status must be either Available or Unavailable'
          }
        }
      },
      imageUrl: DataTypes.ARRAY(DataTypes.STRING),
      amenities: DataTypes.ARRAY(DataTypes.STRING),
      locationId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      services: DataTypes.ARRAY(DataTypes.STRING),
      owner: DataTypes.INTEGER,
      mapLocations: DataTypes.JSON
    },
    {}
  );
  Accommodations.associate = (models) => {
    // associations can be defined here
    Accommodations.hasMany(models.Rooms, {
      foreignKey: 'accommodationId',
      as: 'room',
      onDelete: 'CASCADE'
    });
    Accommodations.hasMany(models.Ratings, {
      foreignKey: 'accommodationId',
      as: 'rating',
      onDelete: 'CASCADE'
    });
    Accommodations.hasMany(models.Likes, {
      foreignKey: 'accommodationId',
      as: 'like',
      onDelete: 'CASCADE'
    });
  };
  return Accommodations;
};
