
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { User, Role } = require('../models')

const displayDashboardView = (req, res) => {
    res.render('dashboard', {
        title: 'Dashboard'
    });
}

const displaySignUpView = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.render('signup', {
            title: 'Sign Up',
            roles
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.json({
            message: 'Something went wrong'
        });
    }
}

const displayUsersView = async (req, res) => {
    try {
        const queryUsers = {
            attributes: ['id', 'names', 'lastNames', 'ci', 'username', 'cellPhone', 'enabled'],
            where: { deletedStatus: false },
            order: [
                ['updatedAt', 'DESC'],
            ],
            include: {
                model: Role,
                attributes: ['name'],
                where: {
                    name: {
                        [Op.ne]: 'admin'
                    }
                }
            },
        };
        const [ roles, users ] = await Promise.all([
            Role.findAll(), 
            User.findAll(queryUsers)
        ]);

        res.render('users', {
        title: 'Usuarios',
        users,
        roles
    });
    } catch (error) {
        console.log('ERROR => ', error)
        res.json({
            msg: 'Algo salió mal al momento de cargar la página.'
        });
    }
};

const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'names', 'lastNames', 'ci', 'username', 'gender', 'cellPhone', 'address', 'img', 'enabled', 'password'],
            where: {
                deletedStatus: false
            },
            include: {
                model: Role,
                attributes: ['id', 'name'],
            },
        });
        res.json({
            user
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.json({
            msg: 'Ocurrió un error al obtener los usurios.'
        });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'names', 'lastNames', 'ci', 'username', 'cellPhone', 'enabled'],
            where: {
                deletedStatus: false
            },
            include: {
                model: Role,
                attributes: ['name'],
                where: {
                    name: {
                        [Op.ne]: 'admin'
                    }
                }
            },
        });
        res.json({users});
    } catch (error) {
        console.log('ERROR => ', error);
        res.json({
            msg: 'Ocurrió un error al obtener los usurios.'
        });
    }
};

const createUser = async (req, res) => {
    try {
        const {names, lastNames, ci, username, password, gender, cellPhone=null, address=null, img=null, roleId} = req.body;
        const user = await User.create({names, lastNames, ci, username, password, gender, cellPhone, address, img, roleId});
        if (!user) {
            console.log('was not created')
            return res.json({
                msg: 'No se pudo registrar al usario, Inentalo de nuevo.',
                user
            });
        }
        res.json({
            msg: 'El usario fue registrado exitosamente',
            user
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const {id, names, lastNames, ci, username, password, gender, cellPhone=null, address=null, img=null, roleId} = req.body;
        let userData = {names, lastNames, ci, username, password, gender, cellPhone, address, img, roleId}
        if (password) {
            const salt = bcrypt.genSaltSync(10);
            userData.password = bcrypt.hashSync(password, salt);
        } else {
            delete userData.password;
        }
        // const user = await User.update({names, lastNames, ci, username, password, gender, cellPhone, address, img, roleId}, {
        const user = await User.update(userData, {
            where: {id:id}
        });
        if (!user[0]) {
            return res.json({
                user,
                msg: 'El usuario No ha sido actualizado. Inténtalo de nuevo.'
            });
        }
        res.json({
            user,
            msg: 'Los datos del usuario han sido actualizados satisfactoriamente.'
        });

    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.update({deletedStatus:true }, {
            where: {id:id}
        });
        if (!user[0]) {
            return res.json({
                user,
                msg: 'El usuario No ha sido eliminado. Inténtalo de nuevo.'
            });
        }
        res.json({
            user,
            msg: 'El usuario ha sido eliminado satisfactoriamente.'
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
};

const enableOrDisableUser = async (req, res) => {
    try {
        const  {id} = req.params;
        const {enabled} = req.body;
        const user = await User.update({enabled:enabled }, {
            where: {id:id}
        });
        if (!user[0]) {
            return res.json({
                user,
                msg: 'El usuario No ha sido Habilitado. Inténtalo de nuevo.'
            });
        }
        res.json({
            user,
            msg: 'El usuario ha sido Deshabilitado satisfactoriamente.'
        });
    } catch (error) {
        console.log('ERROR => ', error);
        res.status(500).json({
            msg: 'Se produjo un error y no se pudo completar su solicitud. Inténtalo de nuevo.'
        });
    }
} 

module.exports = {
    displayDashboardView,
    displaySignUpView,
    displayUsersView,
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    enableOrDisableUser
}