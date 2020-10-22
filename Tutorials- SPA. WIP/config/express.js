const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')
//const auth = require('../middlewares/auth');

module.exports = (app) => {

    app.engine('.hbs', handlebars({ 
        layoutsDir: 'views',
        defaultLayout: 'base-layout',
        partialsDir: 'views/partials',
        extname: '.hbs' 
    }));
    app.set('view engine', '.hbs');

    app.use(cookieParser())
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json())
    app.use(express.static('public'));


};