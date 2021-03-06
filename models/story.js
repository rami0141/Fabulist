module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Story", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {len: [1]}
    }
  });

  // Creating a one-many relation, Story --> Turn
  // When an Story is deleted, also delete any associated Turns
  Story.associate = function(models) {
    
    Story.hasMany(models.Turn, {
      onDelete: "cascade"
    });
    
    Story.hasMany(models.Player, {
      onDelete: "cascade"
    });

   };
  
  return Story;
};
