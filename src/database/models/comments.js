import Emitter from '../../utils/eventEmitter';

export default (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      requestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {}
  );
  Comments.associate = (models) => {
    Comments.belongsTo(models.Requests, {
      foreignKey: 'requestId',
      onDelete: 'CASCADE'
    });
    Comments.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  Comments.afterCreate(({ dataValues }) => {
    Emitter.emit('new comment', dataValues);
  });
  return Comments;
};
