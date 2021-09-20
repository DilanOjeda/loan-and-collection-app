


const displayCustomersView = (req, res) => {
    res.render('customers', {
        title: 'Prestatarios'
    });
} 

module.exports = {
    displayCustomersView
}