const mongoose = require('mongoose');
const {Schema, model: Model} = mongoose;
const {String,Number,ObjectId, Boolean} = Schema.Types;

const modelSchema = new Schema({
    title: {
        type : String,
        unique : true,
        required: true
    },
    description: {
        type : String,
        required: true,
        maxlength : 50
    },
    imageUrl: {
        type : String,
         required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false 
    },
    createdAt: {
        type : String,
        required: true
    },
    creator: {
       type: ObjectId,
       ref: 'User'
    },
    enrolledUsers: [
        {
            type : ObjectId,
            ref: 'User'
        }
    ]

    
});
module.exports = new Model('Model', modelSchema)