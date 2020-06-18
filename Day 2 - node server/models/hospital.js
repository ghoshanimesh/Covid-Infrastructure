const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    state: {type: String, required: [true, 'State is required']},
    district : {
        type: String,
        required: [true, 'District is required']
    },
    hospital_name: {type: String, required: [true, 'Hospital Name is required']},
    //hospital_category : {type: String, required: [true, 'Hospital Name is required']},
    no_of_normal_beds : {type: Number, required: [true, 'Hospital Name is required']},
    no_of_icu_beds : {type: Number, required: [true, 'Hospital Name is required']},
    no_of_ventilators : {type: Number, required: [true, 'Hospital Name is required']},

})

const hospital = module.exports = mongoose.model('Hospital', hospitalSchema)