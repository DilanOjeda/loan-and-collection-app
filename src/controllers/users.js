


const dashboard = (req, res) => {
    res.render('dashboard');
}

const getUser = (req, res) => {
    res.json({
        name: 'dilan',
        age: 24
    })
};

const getUsers = (req, res) => {
    res.render('users')
};

const createUser = (req, res) => {

};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};


module.exports = {
    dashboard,
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}