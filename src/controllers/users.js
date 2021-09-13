
const { User, Role } = require('../models')

const displayDashboard = (req, res) => {
    res.render('dashboard');
}

const displaySignUp = async (req, res) => {

    try {
        const roles = await Role.findAll();

        res.render('signup', {
            title: 'Sign Up',
            roles
        });
    } catch (error) {
        console.log('ERROE => ', error);
        res.json({
            message: 'Something went wrong'
        })
    }
    
}


const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: {id}});

        res.json({
            user
        })
    } catch (error) {
        console.log('ERROE => ', error);
        res.json({
            message: 'Something went wrong'
        })
    }
    
};

const getUsers = (req, res) => {
    res.render('users')
};

const createUser = async (req, res) => {
    try {
        const {names, lastNames, ci, username, password, gender, cellPhone='', address='', img='', roleId} = req.body;
        await User.create({names, lastNames, ci, username, password, gender, cellPhone, address, img, roleId});
        res.status(200).json({
            msg: 'El usario fue creado exitosamente',
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        })
    }
};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};


module.exports = {
    displayDashboard,
    displaySignUp,
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}