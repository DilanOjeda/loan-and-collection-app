const { Router } = require('express');
const router = Router();
const fs = require('fs');

const pathRouter = `${__dirname }`;

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExtension = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExtension);
    if (!skip) {
        router.use(`/${fileWithOutExtension}/`, require(`./${fileWithOutExtension}`));
        console.log('file --->', removeExtension(file) )
    }
});


router.get('*', (req, res) => {
    res.status(404);
    res.json({ error: 'Not foundd'});
});

module.exports = router;