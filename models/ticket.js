'use strict';
module.exports = (sequelize, DataTypes) => {
  var ticket = sequelize.define('ticket', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true    // PrimaryKey meant that it must have a unique value
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    responses: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "Awaiting admin's response..."
    },
    topic: {
      allowNull: false,
      type: DataTypes.STRING
    },
    status:{
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0   // 0 = Queued, 1 = in-progress, 2 = solved
    }
    
  });
  ticket.associate = function(models) {
    // ticket.belongsTo(models.user, {
    //   foreignKey: 'user_id'
    // })
  };
  return ticket;
};