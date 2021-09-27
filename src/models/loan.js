const { DataTypes } = require('sequelize');
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
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    numberFees: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    feeAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    modality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loanDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING(100),
        allowNull:true
    },
    loanStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    // timestamps: false,
    freezeTableName: true,
});

module.exports = Loan;