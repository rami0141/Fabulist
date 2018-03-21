module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    }
  });

  // Creating a one-to-many relation, Player --> Turn
  // When an Player is deleted, also delete any associated Turns
  // It is unlikely that Fabulist gameplay will delete players
  Player.associate = function(models) {
    Player.hasMany(models.Turn, {
      onDelete: "cascade"
    });
  };

  Player.associate = function(models){
    Player.belongsTo(models.Story, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Player;
};
