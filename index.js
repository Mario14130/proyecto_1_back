const express = require('express');
const app = express();
// const fileUpload = require('express-fileupload');
const { router } = require('./routes/router');

// app.use(fileUpload);
app.use(router);

app.listen(3001, function() {
    console.log('Node server running on http://localhost:3001');
})

