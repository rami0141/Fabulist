module.exports = function(sequelize, DataTypes) {
  var Turn = sequelize.define("Turn", {
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    illustration:  { 
      type: DataTypes.STRING, allowNull: true,
      defaultValue: null,
      validate: { isUrl: { msg: 'Invalid URL' } }
    }
  });
    
    Turn.associate = function(models){

      Turn.belongsTo(models.Player, {
        foreignKey: {
          allowNull: false
        }
      }); 
         
      Turn.belongsTo(models.Story, {
        foreignKey: {
          allowNull: false
        }
      });
      
    };

  return Turn;
};