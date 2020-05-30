export default (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    'Likes',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
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
  Likes.associate = (models) => {
    Likes.belongsTo(models.Accommodations, {
      foreignKey: 'accommodationId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Likes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Likes;
};
