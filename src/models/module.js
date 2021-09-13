const { DataTypes } = require('sequelize');
const connectionDB = require('../../config/db/connection');

const Module = connectionDB.define('module', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
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

module.exports = Module;