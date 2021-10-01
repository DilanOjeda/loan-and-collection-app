



const displayLogin = (req, res) => {
    res.render('login');
}

const verifyUserAuthentication = (req, res, next) => {
    // If user is authenticated 
    if ( req.isAuthenticated() ) {
        return next();
    }
    // If not 
    return res.redirect('/auth/login');
}

const closeSession = (req, res) => {
    req.session.destroy( () => {
        res.redirect('/auth/login');
    });
}

module.exports = {
    displayLogin,
    closeSession,
    verifyUserAuthentication,
}