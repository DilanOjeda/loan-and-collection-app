const passport = require('passport');

const { User } = require('../models');

const authenticateUser = passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/failure'
});

module.exports = {
    authenticateUser
}