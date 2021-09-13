const { DataTypes, BOOLEAN } = require('sequelize');
const connectionDB = require('../../config/db/connection');

const Loan = connectionDB.define('loan', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    creditAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    interestRate: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    modality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING(150),
        allowNull:true
    },
    numberFee: {
        type: DataTypes.INTEGER(),
        allowNull: false
    },
    deletedStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Loan;