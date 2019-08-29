module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        userName: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        userAge: {
            type: DataTypes.INTEGER
        }
    });
    users.associate = (models) => {
    };
    return users;
}