const { Op } = require('sequelize');
const  { Role, User }  = require('../models');

const validateRole = async (roleId = '') => {
    const isRole = await Role.findByPk(roleId);
    if (!isRole) {
        throw new Error(`El tipo de usuario seleccionado no existe.`);
    }
}

const validateGender = async (gender = '') => {
    const genders = ['Mujer', 'Hombre']; 
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

const validateUsernameToUpdate = async (username, {req}) => {
    const {id} = req.body;
    const existUsername = await User.findOne({
        where: {
            [Op.and]: [
                { id: { [Op.ne]: id } }, 
                { username: username }
            ],
        }
    });
    if (existUsername) {
        throw new Error(`El nombre de usuario ingresado ya existe.`);
    }
}

const validateCiToUpdate = async (ci, {req}) => {
    const {id} = req.body;
    const existCi = await User.findOne({
        where: {
            [Op.and]: [
                { id: { [Op.ne]: id } }, 
                { ci: ci }
            ],
        }
    });
    if (existCi) {
        throw new Error(`El carnet de identidad ingresado ya existe.`);
    }
}



/*
SELECT *
FROM user
WHERE user.id != '72fd3a9e-1c6f-48fa-a5a4-5dbf92a9d189' AND user.username = 'alondrita_bebecita@gmail.com'
*/

module.exports = {
    validateRole,
    validateGender,
    validateCi,
    validateUsername,
    validateUsernameToUpdate,
    validateCiToUpdate,
}