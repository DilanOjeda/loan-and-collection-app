const { check } = require('express-validator');

const validateFields = require('../helpers/vaidateFields');
const {validateCustomerId} = require('../helpers/validatorsDbCustomer');



const validateLoan = [
    check('customerId')
    .trim()
    .not().isEmpty().withMessage('Debe seleccionar un cliente registrado.').bail()
    .custom(validateCustomerId),
    check('creditAmount')
    .trim()
    .not().isEmpty().withMessage('El campo del monto del prestamo no debe ir vacío.').bail()
    .isNumeric().withMessage('El monto del prestamo debe de ser numérico.'),
    check('interestRate')
    .trim()
    .not().isEmpty().withMessage('El campo del interés del prestamo no debe ir vacío.').bail()
    .isInt({min: 1, max: 100}).withMessage('El interés del prestamo deben ser números entre 1 - 100.'),
    // .isNumeric('El interés del prestamo debe de ser numérico.'),
    check('numberFees')
    .trim()
    .not().isEmpty().withMessage('El campo de cantidad de cuotas no debe ir vacío.').bail()
    .isInt({min: 1, max: 120}).withMessage('La cantidad de cuotas a pagar deben de ser números entre 1 - 120.'),
    check('modality')
    .trim()
    .not().isEmpty().withMessage('Debe seleccionar una modalidad de pago del prestamo.').bail()
    .isIn(['daily', 'weekly', 'biweekly', 'monthly']).withMessage('La modalidad de pago del prestamo seleccionado no existe'),
    check('loanDate')
    .trim()
    .not().isEmpty().withMessage('Debe seleccionar la fecha de emisión del prestamo.').bail()
    .isISO8601({ strict: false, strictSeparator: false }).withMessage('La fecha de emisión del prestamo no es una fecha válida.'),
    check('feeAmount')
    .trim()
    .not().isEmpty().withMessage('El campo de la cuota a pagar no debe ir vacío.').bail()
    .isFloat({min:1}).withMessage('La cuota a pagar debe de ser un número positivo (+).'),
    check('interestAmount')
    .trim()
    .not().isEmpty().withMessage('El campo total del interés a pagar no debe ir vacío.').bail()
    .isFloat({min:1}).withMessage('El total del interés a pagar debe de ser un número positivo (+).'),
    check('totalAmount')
    .trim()
    .not().isEmpty().withMessage('El campo del monto total a pagar no debe ir vacío.').bail()
    .isFloat({min:1}).withMessage('El monto total a pagar debe de ser un número positivo (+).'),
    validateFields
];

let validateCreateLoan = [
    check('ci')
    .trim()
    .toUpperCase()
    .not().isEmpty().withMessage('El campo del C.I. no debe ir vacío: 4198081 LP.').bail()
    .isLength({min:5}).withMessage('El número de C.I. debe tener más de 5 caracteres.').bail()
    .isAlphanumeric('es-ES', {ignore: ' '}).withMessage('El número C.I. debe incluir unicamente letras y números.').bail()
];


let validateUpdateLoan = [
    check('ci')
    .trim()
    .toUpperCase()
    .not().isEmpty().withMessage('El campo del C.I. no debe ir vacío: 4198081 LP.').bail()
    .isLength({min:5}).withMessage('El número de C.I. debe tener más de 5 caracteres.').bail()
    .isAlphanumeric('es-ES', {ignore: ' '}).withMessage('El número C.I. debe incluir unicamente letras y números.').bail()
];

validateUpdateLoan = validateUpdateLoan.concat(validateLoan);
validateCreateLoan = validateCreateLoan.concat(validateLoan);

module.exports = {
    validateLoan,
    validateCreateLoan,
    validateUpdateLoan
}