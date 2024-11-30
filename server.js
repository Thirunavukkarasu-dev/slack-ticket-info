const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
require('./helper/cronJobs');

app.listen(8000, () => {
    console.log(`Server listening on Port ${process.env.PORT}`)
});