const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const routes = require('./routers/index')
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/TUTORIAL', {})
    .then(() => {
        console.log("Connect to mongoDb")
    })
    .catch((err) => {
        console.log(err)
    })
app.use('/api', routes)
app.listen(PORT, function() {
    console.log("Listen Port" + PORT);
})