module.exports = (sequelize, DataTypes) => {
    const Days = sequelize.define('Days', {
        date: {
            type: DataTypes.DATEONLY
        },
        events: {
            type: DataTypes.INTEGER
        }
    });
  
    Days.associate = (models) => {
        Days.belongsTo(models.Users)
    };
  
    return Days;
  };