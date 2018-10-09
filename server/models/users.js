module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
      username: {
          type: DataTypes.STRING,
          unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        }
    });
  
    Users.associate = (models) => {
        Users.belongsToMany(models.Users, {
            as: 'Friends',
            through: 'Friendships'
        }),
        Users.belongsToMany(models.Days, {
            through: {model: models.UsersDays}
        })
    };
  
    return Users;
  };