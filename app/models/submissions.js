module.exports = function(sequelize, DataTypes) {
  var Submissions = sequelize.define("Submissions", {

    id: { 
      autoIncrement: true, 
      primaryKey: true, 
      type: DataTypes.INTEGER},

    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },

    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },

    Message: {
      type: DataTypes.STRING
    },
    
  });

  Submissions.associate = function(models) {
     Submissions.belongsTo(models.user, {
        foreignKey: {
            allowNull: false
        }
    });
  };

  return Submissions;
};