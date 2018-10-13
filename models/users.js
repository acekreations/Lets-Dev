module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            required: true
        },
        fullName: {
            type: DataTypes.STRING,
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        activity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        imageUrl: {
            type: DataTypes.STRING
        }
    });

    Users.associate = models => {
        Users.belongsToMany(models.Users, {
            as: "Friends",
            through: "Friendships"
        }),
            Users.belongsToMany(models.Days, {
                through: { model: models.UsersDays }
            });
    };

    return Users;
};
