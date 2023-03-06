const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ToySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    publisher:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('toy', ToySchema)