const mongoose = require('mongoose')

const casesSchema = new mongoose.Schema({
    age: {type: Number, required: [true, 'Age is required']},
    gender: {type: String, required: [true, 'Gender is required']},
});

const cases = module.exports = mongoose.model('Case', casesSchema)