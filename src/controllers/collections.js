



const displayCollectionsView = (req, res) => {
    res.render('collections', {
        title: 'Cobranzas'
    });
}

module.exports = {
    displayCollectionsView,
}