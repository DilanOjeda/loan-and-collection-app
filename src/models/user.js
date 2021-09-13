const { DataTypes } = require('sequelize');
const connectionDB = require('../../config/db/connection');

const User = connectionDB.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    names: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastNames: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ci: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    cellPhone: {
        type: DataTypes.INTEGER(10),
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    img: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    deletedStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    timestamps: false,
    freezeTableName: true,
});

module.exports = User;