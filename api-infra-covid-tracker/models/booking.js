const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  phoneno: { type: String, required: [true, "Phone no is required"] },
  date: { type: String, required: [true, "Date is required"] },
  gender: { type: String, required: [true, "Gender is required"] },
  hospital_id: { type: mongoose.Schema.ObjectId },
});

const mybook = (module.exports = mongoose.model("Booking", bookingSchema));
