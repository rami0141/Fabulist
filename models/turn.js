module.exports = function(sequelize, DataTypes) {
  var Turn = sequelize.define("Turn", {
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    illustration: {
      type: DataTypes.STRING.BINARY,
      allowNull: true
    }
  });

  Turn.associate = function(models){
    Turn.belongsTo(models.Story, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Turn.associate = function(models){
    Turn.belongsTo(models.Player, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Turn.sync();

  return Turn;
};