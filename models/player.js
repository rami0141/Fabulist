module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Player.associate = function(models) {
    // Associating Player with Story
    // When an Author is deleted, also delete any associated Posts
    Player.hasMany(models.Turn, {
      onDelete: "cascade"
    });
  };

  Player.associate = function(models){
    Player.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Player;
};
