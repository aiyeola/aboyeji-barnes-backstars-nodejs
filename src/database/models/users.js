export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ['^[a-zA-Z0-9_]+$', 'i']
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: ['^[a-zA-Z0-9_]+$', 'i']
        }
      },
      userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userRoles: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Requester',
        validate: {
          isIn: {
            args: [
              [
                'Travel Team Member',
                'Travel Administrator',
                'Manager',
                'Requester',
                'Accommodation Supplier'
              ]
            ],
            msg:
              'User Roles must either be Travel Team Member, Travel Administrator, Manager or Requester'
          }
        }
      },
      accountVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      emailAllowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      requestAutofill: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {}
  );
  Users.associate = (models) => {
    Users.hasOne(models.UserProfile, {
      foreignKey: 'userId',
      as: 'userProfile'
    });
    Users.hasOne(models.ProfilePictures, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Requests, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Likes, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Feedbacks, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Comments, {
      foreignKey: 'userId'
    });
    Users.hasMany(models.Notifications, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Users.hasMany(models.Chats, {
      foreignKey: 'userId'
    });
  };
  return Users;
};
