const { DataTypes } = require('sequelize');
const connectionDB = require('../../config/db/connection');

const Role = connectionDB.define('role', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false,
    }, 
    description: {
        type: DataTypes.STRING(150),
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Role;