const {
    Router
} = require('express');
const {getAllCubes} = require('../controllers/cubes.js');
const {getCube} = require('../controllers/database')
const Cube = require('../models/cube')
const router = Router();
module.exports = (app) => {
    app.get('/', (req, res) => {
        getAllCubes((cubes) =>{res.render('index', {
            title: 'Cube Workshop',
            cubes
        });
    })
 
    })
    app.get('/about', (req, res) => {
        res.render('about');
    })
    app.get('/details/:id', (req, res) => {
        getCube(req.params.id,(cube)=>{
            res.render('details', {
                title: 'Details | Cube Workshop',
                ...cube
            });

        })

    })
    app.get('/create', (req, res) => {
        res.render('create');
    })
    app.post('/create', (req, res) => {
       const {
        name,
        description,
        imageUrl,
        difficultyLevel
       } = req.body;
       const cube = new Cube(name,description,imageUrl,difficultyLevel);
       cube.save()
        res.redirect('/')

    })
    app.get('*', (req, res) => {
        res.render('404');
    })
}
