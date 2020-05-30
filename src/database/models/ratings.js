export default (sequelize, DataTypes) => {
  const Ratings = sequelize.define(
    'Ratings',
    {
      userId: DataTypes.INTEGER,
      accommodationId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER
    },
    {}
  );
  Ratings.associate = (models) => {
    Ratings.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
    Ratings.belongsTo(models.Accommodations, {
      foreignKey: 'accommodationId'
    });
  };
  return Ratings;
};
