const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Hospital = require("../models/hospital");
const Case = require("../models/cases");
const Booking = require("../models/booking");

router.get("/", (req, res, next) => {
  res.send("Hello");
});

router.post("/addBedBooking",(req,res,next) => {
  let newBooking = new Booking({
    name:req.body.name,
    phoneno:req.body.phoneno,
    date:req.body.date,
    gender:req.body.gender,
    hospital_id: mongoose.Types.ObjectId(req.body.hosp_id),
  });
  console.log(newBooking);
  newBooking.save((err, booked) => {
    if (err) {
      res.json({ msg: "Failed to book a bed " + err , success : false});
    } else {
      console.log(booked);
      res.json({ msg: "Bed Booked successfully",success : true });
    }
  });
});

router.get("/getCountOfHospitalized/:hosp_id", (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.params.hosp_id);
  let results = [];
  if (id != null) {
    console.log(id);
    let query_h = Case.aggregate([
      {
        $match: {
          hospital_id: id,
        },
      },
      {
        $group: {
          _id: "$date_admitted",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    var hospitalized_count;
    query_h.exec((err, cases) => {
      console.log("insdide query exev");
      if (err) {
        console.log("Herereee");
        res
          .status(404)
          .json({ msg: "Error retrieving hospital with id " + err });
      } else {
        console.log("I am in else");
        hospitalized_count = cases;
        results.push(hospitalized_count);
        res.send(results);
      }
    });
  } else res.send("Please give id");
});

router.get("/getCountOfHospitalizedByDistrict/:name", (req, res, next) => {
  var name = (req.params.name);
  let results = [];
  if (name != null) {
    console.log(name);
    let query_h = Case.aggregate([
      { 
        "$lookup": {
          from: "hospitals",
          localField: "hospital_id",
          foreignField: "_id",
          as: "temp"
      }},
      { "$unwind": "$temp" },
      {
        $match: {
          "temp.district": name,
        },
      },
      {
        $group: {
          _id: "$date_admitted",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    var hospitalized_count;
    query_h.exec((err, cases) => {
      console.log("insdide query exev");
      if (err) {
        console.log("Herereee");
        res
          .status(404)
          .json({ msg: "Error retrieving hospital with id " + err });
      } else {
        console.log("I am in else");
        hospitalized_count = cases;
        results.push(hospitalized_count);
        res.send(results);
      }
    });
  } else res.send("Please give id");
});

router.get("/getCountOfRecovered/:hosp_id", (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.params.hosp_id);
  let results = [];
  if (id != null) {
    console.log(id);
    let query_r = Case.aggregate([
      {
        $match: {
          hospital_id: id,
          current_status: "Recovered",
        },
      },
      {
        $group: {
          _id: "$date_released",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    var recovered_count;
    query_r.exec((err, cases) => {
      console.log("insdide query exev");
      if (err) {
        console.log("Herereee");
        res
          .status(404)
          .json({ msg: "Error retrieving hospital with id " + err });
      } else {
        console.log("I am in else");
        recovered_count = cases;
        results.push(recovered_count);
        res.send(results);
      }
    });
  }
});

router.get("/getCountOfRecoveredByDistrict/:name", (req, res, next) => {
  var name = (req.params.name);
  let results = [];
  if (name != null) {
    console.log(name);
    let query_r = Case.aggregate([
      { 
        "$lookup": {
          from: "hospitals",
          localField: "hospital_id",
          foreignField: "_id",
          as: "temp"
      }},
      { "$unwind": "$temp" },
      {
        $match: {
          "temp.district": name,
          current_status: "Recovered",
        },
      },
      {
        $group: {
          _id: "$date_released",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    var recovered_count;
    query_r.exec((err, cases) => {
      console.log("insdide query exev");
      if (err) {
        console.log("Herereee");
        res
          .status(404)
          .json({ msg: "Error retrieving hospital with id " + err });
      } else {
        console.log("I am in else");
        recovered_count = cases;
        results.push(recovered_count);
        res.send(results);
      }
    });
  }
});

router.get("/getCountOfDeath/:hosp_id", (req, res, next) => {
  var id = mongoose.Types.ObjectId(req.params.hosp_id);
  let results = [];
  if (id != null) {
    console.log(id);
    let query_d = Case.aggregate([
      {
        $match: {
          hospital_id: id,
          current_status: "Death",
        },
      },
      {
        $group: {
          _id: "$date_released",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    var death_count;
    query_d.exec((err, cases) => {
      console.log("insdide query exev");
      if (err) {
        console.log("Herereee");
        res
          .status(404)
          .json({ msg: "Error retrieving hospital with id " + err });
      } else {
        console.log("I am in else");
        death_count = cases;
        results.push(death_count);
        res.send(results);
      }
    });
  } else res.send("Please give id");
});

router.get("/getCountOfDeathByDistrict/:name", (req, res, next) => {
  var name = (req.params.name);
  let results = [];
  if (name != null) {
    console.log(name);
    let query_d = Case.aggregate([
      { 
        "$lookup": {
          from: "hospitals",
          localField: "hospital_id",
          foreignField: "_id",
          as: "temp"
      }},
      { "$unwind": "$temp" },
      {
        $match: {
          "temp.district": name,
          current_status: "Death",
        },
      },
      {
        $group: {
          _id: "$date_released",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    var death_count;
    query_d.exec((err, cases) => {
      console.log("insdide query exev");
      if (err) {
        console.log("Herereee");
        res
          .status(404)
          .json({ msg: "Error retrieving hospital with id " + err });
      } else {
        console.log("I am in else");
        death_count = cases;
        results.push(death_count);
        res.send(results);
      }
    });
  } else res.send("Please give id");
});

router.get("/getCountOfBed/:hosp_id", (req, res, next) => {
  let id = mongoose.Types.ObjectId(req.params.hosp_id);

  let query = Case.aggregate([
    {
      $match: {
        hospital_id: id,
        current_status: "Hospitalized",
      },
    },
    {
      $group: {
        _id: "$bed_type",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  query.exec((err, cases) => {
    console.log("insdide query exev");
    if (err) {
      console.log("Herereee");
      res.status(404).json({ msg: "Error retrieving hospital with id " + err });
    } else {
      console.log("I am in else");
      console.log(cases);
      var query_h = Hospital.find({ _id: id });
      query_h.exec((err, count) => {
        var n = 0;
        var i = 0;
        var v = 0;
        console.log(count);
        cases.forEach(element => {
          if(element._id == "NORMAL_BED"){
            n = count[0].no_of_normal_beds - cases[1].count;
          }
          if(element._id == "ICU_BED"){
            i = count[0].no_of_icu_beds - cases[0].count;
          }
          if(element._id == "VENTILATOR_BED"){
            v = count[0].no_of_ventilators - cases[2].count;
          }

        });

        if (n < 0) {
          n = 0;
        }
        if (v < 0) {
          v = 0;
        }
        if (i < 0) {
          i = 0;
        }

        let ress = {
          NORMAL_BED: n,
          ICU_BED: i,
          VENTILATOR_BED: v,
        };
        console.log(ress);
        res.send(ress);
      });
    }
  });
});

router.get("/getAllHospitals", (req,res,next)=>{
  let hosp_query = Hospital.find({}, {__v:0});
  hosp_query.exec((err,hospitals)=>{
    if(err){
      res.send({msg: "Error " + err}); 
    }else{
      res.send(hospitals);
    }
  }); 
})

module.exports = router;
