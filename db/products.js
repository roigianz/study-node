module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define('products', {
        productName: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        productPrice: {
            type: DataTypes.DOUBLE
        }
    });
    products.associate = (models) => {
    };
    return products;
}