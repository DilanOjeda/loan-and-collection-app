const User = require('../../src/models/user');
const Loan = require('../../src/models/loan');
const Customer = require('../../src/models/customer');
const Role = require('../../src/models/role');
const Module = require('../../src/models/module');
const Fee = require('../../src/models/fee');

// 1:N add a userId attribute to the Loan table
User.hasMany(Loan, {foreignKey: 'userId'} );   // =! hasOne
// 1:N add a customerId attribute to the Loan table
Customer.hasMany(Loan, {foreignKey: 'customerId'} );
// 1:N: add a roleId to the User table
User.belongsTo(Role, {foreignKey: 'roleId'} );

// N:N
Module.belongsToMany(Role, { 
    through: 'role_access_module',
    foreignKey: 'moduleId',
});
Role.belongsToMany(Module, {
    through: 'role_access_module',
    foreignKey: 'roleId',
});

Loan.hasMany(Fee, {foreignKey: 'loanId'})