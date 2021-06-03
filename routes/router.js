const express = require('express');
const router = express.Router();
const { automata, saveFile } = require('./../automata');

router.post('/automata', async function (req, res) {

    const file = req.files.file

    if (!file) {
        res.status(500).send({ message: 'No se encontro el archivo' });
    }

    try {
        const { status, message, path } = await saveFile(file);

        console.log('5');

        if (!status) {
            return res.status(500).send({ message });
        }

        const content = await automata(path);
        res.status(200).send({ ...content });
    } catch (error) {
        res.status(500).send({ message: 'Algo anda mal carnal, revisa bien', error });
    }

});

module.exports = { router };