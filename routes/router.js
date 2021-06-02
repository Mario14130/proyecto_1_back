const express = require('express');
const router = express.Router();
const { automata, saveFile } = require('./../automata');

router.get('/', function (req, res) {
    res.send('<h1>API Funcionando correctamente</h1>');
});

router.post('/automata', async function (req, res) {
    // let file = req.files.file
    // const { status, message, location } = saveFile(file);
    // if (!status) {
    //     return res.status(500).send({ message });
    // }

    try {
        const content = await automata();
        const { status } = content;
        res.status(status).send({ content });
    } catch (error) {
        res.status(500).send({message: 'Algo anda mal carnal, revisa bien', error});
    }


});

module.exports = { router };