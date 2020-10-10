const {v4} = require('uuid');
const {saveCube} = require('../controllers/database')

class Cube{
    constructor(name,decription,imageURL,difficulty){
        this.id = v4();
        this.name = name || 'No name';
        this.decription = decription;
        this.imageURL = imageURL || 'Placeholder';
        this.difficulty = difficulty || 0
    }
    save(callback){
        const newCube = {
            id: this.id,
            name: this.name,
            description: this.decription,
            imageUrl: this.imageURL,
            difficulty: this.difficulty
        }
        saveCube(newCube,callback)
        
    }
}
module.exports = Cube;