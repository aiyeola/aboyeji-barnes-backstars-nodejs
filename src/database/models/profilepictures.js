export default (sequelize, DataTypes) => {
  const ProfilePictures = sequelize.define(
    'ProfilePictures',
    {
      userId: DataTypes.INTEGER,
      url: DataTypes.STRING
    },
    {}
  );
  ProfilePictures.associate = (models) => {
    ProfilePictures.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return ProfilePictures;
};
