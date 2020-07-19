const mongoose = require('mongoose')

const hospitalUserSchema = new mongoose.Schema({
    
    hosp_id: {type: mongoose.Schema.ObjectId},
    hospital_username: {type: String, required: [true, 'Hospital userName is required']},
    hospital_password: {type: String, required: [true, 'Hospital password is required']},

})

const Users = module.exports = mongoose.model('Users', hospitalUserSchema)