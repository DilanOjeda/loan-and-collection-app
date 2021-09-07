const { DataTypes } = require('sequelize');

const connectionDB = require('../../config/db/connection');
const Role = require('./role'); 
const Module = require('./module');

const RoleAccessModule = connectionDB.define('role_access_module', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
    },
    roleId: {
        type: DataTypes.INTEGER(10),
        references: {
            model: Role,
            key: Role.id
        }
    }, 
    moduleId: {
        type: DataTypes.INTEGER(10),
        references: {
            model: Module,
            key: Module.id
        }
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = RoleAccessModule;