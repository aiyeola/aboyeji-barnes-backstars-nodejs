export default (sequelize, DataTypes) => {
  const Accommodations = sequelize.define(
    'Accommodations',
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
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
      imageUrl: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      amenities: DataTypes.ARRAY(DataTypes.STRING),
      locationId: { type: DataTypes.INTEGER, allowNull: false },
      description: DataTypes.TEXT,
      services: DataTypes.ARRAY(DataTypes.STRING),
      owner: DataTypes.INTEGER,
      mapLocations: DataTypes.JSONB
    },
    {}
  );
  Accommodations.associate = (models) => {
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
    Accommodations.belongsTo(models.Location, {
      foreignKey: 'locationId',
      onDelete: 'CASCADE'
    });
    Accommodations.hasMany(models.Feedbacks, {
      foreignKey: 'accommodationId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Accommodations;
};
