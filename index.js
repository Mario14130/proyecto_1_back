const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const { router } = require('./routes/router');
app.use(cors());
app.use(fileUpload());

const port = 3001;

app.get('/', function (req, res) {
    res.send('<h1>API Funcionando correctamente</h1>');
});

app.use('/api', router);

app.listen(port, function() {
    console.log(`Node server running on http://localhost:${port}`);
})

