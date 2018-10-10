module.exports = function (sequelize, DataTypes){
    var UsersDays = sequelize.define("UsersDays", {
        activity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    UsersDays.associate = (models) => {
        UsersDays.belongsTo(models.Days)
        UsersDays.belongsTo(models.Users)
    };

    return UsersDays;
}