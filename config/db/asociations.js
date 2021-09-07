const User = require('../../src/models/user');
const Loan = require('../../src/models/loan');
const Customer = require('../../src/models/customer');
const Role = require('../../src/models/role');
const Module = require('../../src/models/module');
const RoleAccessModule = require('../../src/models/role_access_module');
// as: 'loan' => add id (loan+id = loanid)
// foreignKey => key can be overwritten with the foreignKey
//Loan.belongsTo(User, {foreignKey: 'idLoan'});

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
    // sourceKey: "access",
});
Role.belongsToMany(Module, {
    through: 'role_access_module',
    foreignKey: 'roleId',
    // sourceKey: "access",
});
