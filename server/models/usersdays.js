module.exports = function (sequelize, DataTypes){
    var UsersDays = sequelize.define("UsersDays", {
        activity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return UsersDays;
}