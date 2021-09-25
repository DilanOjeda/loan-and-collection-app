const { check } = require('express-validator');

const validateFields = require('../helpers/vaidateFields');
const { validateCustomerCi, validateCustomerCiToUpdate } = require('../helpers/validatorsDbCustomer');
const { validateGender } = require('../helpers/validatorsDbUser');


const validateCustomer = [
    check('names')
    .trim()
    .not().isEmpty().withMessage('El campo del nombre no debe ir vacío.').bail()
    .isAlpha('es-ES', {ignore: ' '}).withMessage('El nombre debe incluir unicamente letras A-Z').bail()
    .isLength({min:2}).withMessage('El nombre debe tener más de 2 caracteres.'),
    check('lastNames')
    .trim()
    .not().isEmpty().withMessage('El campo del apellido no debe ir vacío.').bail()
    .isAlpha('es-ES', {ignore: ' '}).withMessage('El apellido debe incluir unicamente letras A-Z.').bail()
    .isLength({min:2}).withMessage('El apellido debe tener más de 2 caracteres.'),
    check('cellPhone')
    .optional( {checkFalsy : true} )
    .trim()
    .not().isEmpty().withMessage('El campo del número de celular no debe ir vacío.').bail()
    .isLength({min:8, max: 8}).withMessage('El número de celular debe tener 8 digitos o ir vacío.').optional( {checkFalsy : true} ).bail()
    .isNumeric().withMessage('El número de celular debe de ser numérico.'),
    check('gender')
    .trim()
    .not().isEmpty().withMessage('El campo del género no debe ir vacío.').bail()
    .custom(validateGender),
    validateFields
];

let validateCreateCustomer = [
    check('ci')
    .trim()
    .toUpperCase()
    .not().isEmpty().withMessage('El campo del C.I. no debe ir vacío: 4198081 LP.').bail()
    .isLength({min:5}).withMessage('El número de C.I. debe tener más de 5 caracteres.').bail()
    .isAlphanumeric('es-ES', {ignore: ' '}).withMessage('El número C.I. debe incluir unicamente letras y números.').bail()
    .custom(validateCustomerCi),
];


let validateUpdateCustomer = [
    check('ci')
    .trim()
    .toUpperCase()
    .not().isEmpty().withMessage('El campo del C.I. no debe ir vacío: 4198081 LP.').bail()
    .isLength({min:5}).withMessage('El número de C.I. debe tener más de 5 caracteres.').bail()
    .isAlphanumeric('es-ES', {ignore: ' '}).withMessage('El número C.I. debe incluir unicamente letras y números.').bail()
    .custom(validateCustomerCiToUpdate),
];

validateUpdateCustomer = validateUpdateCustomer.concat(validateCustomer);
validateCreateCustomer = validateCreateCustomer.concat(validateCustomer);

module.exports = {
    validateCreateCustomer,
    validateUpdateCustomer
}

