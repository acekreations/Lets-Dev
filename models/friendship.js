module.exports = function(sequelize, DataTypes) {
    var Friendships = sequelize.define("Friendships", {
        accepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        request_from: DataTypes.STRING
    });

    return Friendships;
};
