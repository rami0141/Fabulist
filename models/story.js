module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Story", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1]}
    }
  });

  Story.associate = function(models) {
    // Creating a one-many relation, Story --> Turn
    // When an Author is deleted, also delete any associated Turns
    Story.hasMany(models.Turn, {
      onDelete: "cascade"
    });
  };

  Story.associate = function(models) {
    // Creating a one-many relation, Story --> Player
    Story.hasMany(models.Player);
  };

  Story.sync();
 
  return Story;
};
