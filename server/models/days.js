module.exports = (sequelize, DataTypes) => {
    const Days = sequelize.define('Days', {
      date: {
          type: DataTypes.DATEONLY,
          unique: true
        }
    });
  
    Days.associate = (models) => {
        Days.belongsToMany(models.Users, {
            through: {model: models.UsersDays}
        })
    };
  
    return Days;
  };