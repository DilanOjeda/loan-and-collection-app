const User = require('../../src/models/user');
const Loan = require('../../src/models/loan');
const Customer = require('../../src/models/customer');
const Role = require('../../src/models/role');
const Module = require('../../src/models/module');
const Fee = require('../../src/models/fee');

// 1:N add a userId attribute to the Loan table
User.hasMany(Loan, {foreignKey: 'userId'} );   // =! hasOne
// 1:N add a customerId attribute to the Loan table
Customer.hasMany(Loan, {foreignKey: 'customerId', onDelete: 'cascade'} );
Loan.belongsTo(Customer, {foreignKey: 'customerId', onDelete: 'cascade'} );
// 1:N: add a roleId to the User table
Role.hasMany(User, {foreignKey: 'roleId'} );
User.belongsTo(Role, {foreignKey: 'roleId'} );
// N:N
Module.belongsToMany(Role, { 
    through: 'role_access_module',
    foreignKey: 'moduleId',
    timestamps: false,
});
Role.belongsToMany(Module, {
    through: 'role_access_module',
    foreignKey: 'roleId',
    timestamps: false,
});

Loan.hasMany(Fee, {foreignKey: 'loanId', onDelete: 'cascade'});
Fee.belongsTo(Loan, {foreignKey: 'loanId', onDelete: 'cascade'} );