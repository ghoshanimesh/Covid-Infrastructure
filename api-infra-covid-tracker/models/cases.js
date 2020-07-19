const mongoose = require("mongoose");

const casesSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  age: { type: Number, required: [true, "Age is required"] },
  gender: { type: String, required: [true, "Gender is required"] },
  current_status: { type: String, required: [true, "Status is required"] },
  date_admitted: {
    type: String,
    required: [true, "Date Admitted is required"],
  },
  date_released: {
    type: String,
    required: [false, "Date Released is required"],
  },
  bed_type: { type: String, required: [true, "Date Admitted is required"] },
  hospital_id: { type: mongoose.Schema.ObjectId },
});

const mycases = (module.exports = mongoose.model("Cases", casesSchema));
