export default (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      userId: DataTypes.INTEGER,
      birthDate: DataTypes.DATE,
      department: DataTypes.STRING,
      phoneNumber: DataTypes.NUMERIC,
      language: DataTypes.STRING,
      currency: DataTypes.STRING,
      gender: DataTypes.STRING,
      location: DataTypes.STRING,
      passportName: DataTypes.STRING,
      passportNumber: DataTypes.STRING
    },
    {}
  );
  UserProfile.associate = (models) => {
    UserProfile.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserProfile;
};
