export default (sequelize, DataTypes) => {
  const Chats = sequelize.define(
    'Chats',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      userName: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.STRING, allowNull: false },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {}
  );
  Chats.associate = (models) => {
    Chats.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return Chats;
};
