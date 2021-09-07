const { DataTypes } = require('sequelize');
const connectionDB = require('../../config/db/connection');

const User = connectionDB.define('user', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true

    },
    ci: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    names: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    lastNames: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    cellPhone: {
        type: DataTypes.INTEGER(55),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    deletedStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},{
    timestamps: false,
    freezeTableName: true,
});

module.exports = User;