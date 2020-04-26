/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Feedbacks = sequelize.define(
    'Feedbacks',
    {
      userId: DataTypes.INTEGER,
      feedback: DataTypes.STRING,
      accommodationId: DataTypes.INTEGER
    },
    {}
  );
  Feedbacks.associate = function (models) {
    // associations can be defined here
  };
  return Feedbacks;
};
