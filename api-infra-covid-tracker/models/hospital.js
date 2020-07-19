const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    state: {type: String, required: [true, 'State is required']},
    district : {
        type: String,
        required: [true, 'District is required']
    },
    hospital_name: {type: String, required: [true, 'Hospital Name is required']},
    no_of_normal_beds: {type: Number, required: [true, 'Number of Beds is required']},
    no_of_icu_beds: {type: Number, required: [true, 'Number of ICU is required']},
    no_of_ventilators: {type: Number, required: [true, 'Number of Ventilator is required']}    
})

const hospital = module.exports = mongoose.model('Hospital', hospitalSchema)