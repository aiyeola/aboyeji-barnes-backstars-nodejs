export default (sequelize, DataTypes) => {
  const Feedbacks = sequelize.define(
    'Feedbacks',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      feedback: {
        type: DataTypes.STRING,
        allowNull: false
      },
      accommodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      }
    },
    {}
  );
  Feedbacks.associate = (models) => {
    Feedbacks.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Feedbacks.belongsTo(models.Accommodations, {
      foreignKey: 'accommodationId',
      onDelete: 'CASCADE'
    });
  };
  return Feedbacks;
};
