



const displayLogin = (req, res) => {
    res.render('login');
}

const authenticateUser = (req, res) => {

}

const closeSession = (req, res) => {
    req.session.destroy( () => {
        res.redirect('/auth/login');
    })
}
module.exports = {
    displayLogin,
    authenticateUser,
    closeSession
    
}