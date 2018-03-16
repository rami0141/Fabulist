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
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });

  // It is unlikely that Fabulist gameplay will delete players
  Player.associate = function(models) {
    // Creating a one-to-many relation, Player --> Turn
    // When an Player is deleted, also delete any associated Turns
    Player.hasMany(models.Turn, {
      onDelete: "cascade"
    });
  };


  // Player.associate = function(models){
  //   // Creating a one-to-one relation, Player --> Story
  //   Player.belongsTo(models.Story, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  Player.sync();

  return Player;
};
