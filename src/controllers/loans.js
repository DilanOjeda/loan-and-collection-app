



const displayLoansView = (req, res) => {
    res.render('loans', {
        title: 'Prestamos'
    });
}

module.exports = {
    displayLoansView,
}