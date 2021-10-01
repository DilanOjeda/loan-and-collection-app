const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcryptjs');

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
        type: DataTypes.STRING(60),
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
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    deletedStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    timestamps: true,
    freezeTableName: true,
    hooks: {
        beforeCreate(user) {
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
        },
    }
});

/**
 * Custom methods
 */
User.prototype.verifyPassword = function (password) {
    console.log('password =>', bcrypt.compareSync( password, this.password ));
    return bcrypt.compareSync( password, this.password ); //(receive, from this model)
}
module.exports = User;