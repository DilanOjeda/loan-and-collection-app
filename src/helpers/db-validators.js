const  { Role, User }  = require('../models');

const validateRole = async (roleId = '') => {
    const isRole = await Role.findByPk(roleId);
    if (!isRole) {
        throw new Error(`Lo sentimos, pero el tipo de usuario seleccionado no existe.`);
    }
}

const validateGender = async (gender = '') => {
    const genders = ['woman', 'man']; 
    const isGender = genders.includes(gender);
    if (!isGender) {
        throw new Error(`El género seleccionado no existe.`);
    }
}

const validateCi = async (ci = '') => {
    const existCi = await User.findOne({
        where: {ci}
    });
    if (existCi) {
        throw new Error(`El carnet de identidad ya existe.`);
    }
}

const validateUsername = async (username = '') => {
    const existUsername = await User.findOne({
        where: {username}
    });
    if (existUsername) {
        throw new Error(`El nombre de usuario ya existe.`);
    }
}

module.exports = {
    validateRole,
    validateGender,
    validateCi,
    validateUsername
    
}