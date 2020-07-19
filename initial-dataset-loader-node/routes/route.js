const express = require("express");
const router = express.Router();
const fs = require("fs");
const neatCsv = require("neat-csv");

const mongoose = require("mongoose");
const Hospital = require("../models/hospital");
const Mycases = require("../models/cases");

router.get("/addHospital", (req, res, next) => {
  fs.readFile("csv/hospital.csv", async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let datareadcsv = await neatCsv(data);
    datareadcsv.forEach((element) => {
      let newHospital = new Hospital({
        state: "Maharashtra",
        district: element.District,
        hospital_name: element.Facilty,
        no_of_normal_beds: element.Beds,
        no_of_icu_beds: element.Icu,
        no_of_ventilators: element.Ventilators,
      });
      console.log(newHospital.hospital_name);
      newHospital.save((err, hospital) => {});
    });
  });
  res.send({ msg: "All Hospitals Added" });
});

router.get("/addCases", (req, res, next) => {
  insertCases();
  res.send({ msg: "All Cases Added and Mapped" });
});

async function insertCases() {
  fs.readFile("csv/HospitalizedThane.csv", async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let datareadcsv = await neatCsv(data);
    for (const element of datareadcsv) {
      try {
        let hosp_id;
        var query = Hospital.aggregate([
          { $match: { district: element.district.toUpperCase() } },
          { $sample: { size: 1 } },
        ]);
        query.exec((err, hospital) => {
          if (err) {
            res.send("Err in retreiving random hospital");
          } else {
            hosp_id = hospital[0]._id;
            insertCaseData(element, hosp_id);            
          }
        });
      } catch (err) {
        console.log("err" + err);
      }
    }
  });
}

var insertCaseData = async function (element, hosp_id) {
  let newCase = new Mycases({
    name: element.name,
    age: element.age,
    gender: element.gender,
    current_status: element.current_status,
    date_admitted: element.date_admitted,
    date_released: element.date_released,
    bed_type: element.type_of_bed,
    hospital_id: hosp_id,
  });
  console.log(newCase);
  await newCase.save((err, newcases) => {
    if (err) {
      console.log("Error - " + err);
    } else {
      console.log(newcases._id);
    }
  });
};

/*-----------------------Other Routes----------------------- */

module.exports = router;