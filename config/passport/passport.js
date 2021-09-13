
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
            const user = await User.findOne( {
                where: {username}
            });

            if (!user) {
                return(null, false, {
                    message: `Couldn't find your account` 
                })
            }
            return done(null, user)
        } catch (err) {
            console.log('Error => ', err);
            return done(null, false, {
                message: `Something went wrong! Please try again.`
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