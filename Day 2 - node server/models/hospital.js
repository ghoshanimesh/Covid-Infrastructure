const mongoose = require('mongoose')

const hospitalSchema = new mongoose.Schema({
    state: {type: String, required: [true, 'State is required']},
    district : {
        type: String,
        required: [true, 'District is required']
    },
    hospital_name: {type: String, required: [true, 'Hospital Name is required']},
    hospital_addr: {type: String, required: [true, 'Hospital Address is required']},
    hospitalized: [
        {
            _id: false,
            date: {type: String, required: [true, 'Hospital Address is required']},
            cases: [
                {
                    _id: false,
                    case_id: {type: mongoose.Schema.ObjectId}
                }
            ]
        }
    ],
    deceased:[
        {
            _id: false,
            date: {type: String, required: [true, 'Hospital Address is required']},
            cases: [
                {
                    _id: false,
                    case_id: {type: mongoose.Schema.ObjectId}
                }
            ]
        }
    ],
    recovered:[
        {
            _id: false,
            date: {type: String, required: [true, 'Hospital Address is required']},
            cases: [
                {
                    _id: false,
                    case_id: {type: mongoose.Schema.ObjectId}
                }
            ]
        }
    ],    
})

const hospital = module.exports = mongoose.model('Hospital', hospitalSchema)