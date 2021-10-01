
const passport = require('passport');
const LocalStrategy = require('passport-local');

const { User } = require('../../src/models');

passport.use( new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            const user = await User.findOne({
                attributes: ['names', 'lastNames', 'username', 'enabled', 'password'],
                where: {username}
            });

            if (!user) {
                console.log('not found user account')
                return(null, false, {
                    error_msg: `Couldn't find your account` 
                })
            }
            if ( !user.enabled ) {
                console.log('user account is not enabled')
                return done(null, false, {
                    error_msg: `El usuario no está habilitado para ingresar al sistema.`
                });
            }
            if ( !user.verifyPassword(password) ) {
                console.log('user password is not correct')
                return done(null, false, {
                    error_msg: `Contraseña incorrecta`
                });
            }
            return done(null, user)
        } catch (err) {
            console.log('Error => ', err);
            return done(null, false, {
                error_msg: `Ocurrió un error. Inteta ingresar de nuevo más tarde.`
            })
        }
    }
))


passport.serializeUser( (user, done) => {
    done(null, user);
});

passport.deserializeUser( (user, done) => {
    done(null, user);
});

module.exports = passport;