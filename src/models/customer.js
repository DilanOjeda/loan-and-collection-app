const { DataTypes } = require('sequelize');
const connectionDB = require('../../config/db/connection');

const Customer = connectionDB.define('customer', {
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
    withCredit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deletedStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
},{
    timestamps: true,
    freezeTableName: true,
});

module.exports = Customer;