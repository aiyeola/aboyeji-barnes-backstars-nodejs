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
  Location.associate = (models) => {
    // associations can be defined here
    Location.hasMany(models.Accommodations, {
      foreignKey: 'locationId',
      onDelete: 'CASCADE'
    });
  };
  return Location;
};
