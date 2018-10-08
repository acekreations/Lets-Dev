module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
          type: DataTypes.STRING,
          unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        }
    });
  
    User.associate = (models) => {
        User.belongsToMany(models.User, {
            as: 'friends',
            through: 'friendship'
        }),
        User.belongsToMany(models.Day, {
            through: {model: models.UsersDays}
        })
    };
  
    return User;
  };