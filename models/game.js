module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("Game", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1]}
    },
    // createdAt: Sequelize.DATE
  });

  Game.associate = function(models) {
    // Associating Game with Story
    // When an Author is deleted, also delete any associated Posts
    Game.hasMany(models.Turn, {
      onDelete: "cascade"
    });
  };

  Game.associate = function(models) {
    // Associating Game with Story
    // When an Author is deleted, also delete any associated Posts
    Game.hasMany(models.Player, {
      onDelete: "cascade"
    });
  };

  return Game;
};
