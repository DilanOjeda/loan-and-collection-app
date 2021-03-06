const {DataTypes} = require('sequelize');
const connectionDB = require('../../config/db/connection');
const {format} = require('date-fns');
const es = require('date-fns/locale/es');

const Fee = connectionDB.define('fee', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    feeAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    numberFee: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    feeStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    feePaymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    customerPaymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
        get: function() {
            return format(this.getDataValue('customerPaymentDate'), 'EEE, yyyy-MM-dd HH:mm:ss', {locale: es});
         }
    },
    detail: {
        type: DataTypes.STRING(100),
        allowNull:true
    },
}, {
    timestamps: false,
    freezeTableName: true,
});

module.exports = Fee;