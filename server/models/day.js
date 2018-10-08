module.exports = (sequelize, DataTypes) => {
    const Day = sequelize.define('Day', {
      date: {
          type: DataTypes.DATE,
          unique: true
      }
    });
  
    Day.associate = (models) => {
        Day.belongsToMany(models.User, {
            through: {model: models.UsersDays}
        })
    };
  
    return Day;
  };