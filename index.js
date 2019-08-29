const express = require('express');
const consign = require('consign'); 

const app = express();

consign({verbose: false})
    .include('libs/config.js')
    .then('db.js')
    .then('libs/middleware.js')
    .then('models/common.js')
    .then('models/products.js')
    .then('models/users.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app);

module.exports = app;