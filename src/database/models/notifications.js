export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    'Notifications',
    {
      notification: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      requestId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Notifications.belongsTo(models.Requests, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE'
    });
  };
  return Notifications;
};
