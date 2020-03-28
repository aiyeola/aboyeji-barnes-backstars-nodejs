/* eslint-disable no-undef */
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
      }
    },
    {}
  );
  Users.associate = (models) => {
    // associations can be defined here
  };
  return Users;
};
