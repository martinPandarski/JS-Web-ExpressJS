const Cube = require('../models/cube');
const newCube = new Cube('Default', 'Hi', 'https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png', 2);
newCube.save()