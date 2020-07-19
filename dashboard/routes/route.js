const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/hospital_user");
const Hospital = require("../models/hospital");
const Case = require("../models/cases");

const passport = require("passport");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const random_name = require("random-indian-name");
const fs = require("fs");
const neatCsv = require("neat-csv");
const { count } = require("console");
const cases = require("../models/cases");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

/*
    Normal Routes
*/

router.get("/", (req, res, next) => {
  res.send("Wooooooorking");
});

//Login
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ hospital_username: username }, (err, hospuser) => {
    if (err) {
      res.send("Error " + err);
    }
    if (!hospuser) {
      return res.json({ success: false, msg: "User not found" });
    } else {
      //Match Password
      if (password == hospuser.hospital_password) {
        const token = jwt.sign({ data: hospuser }, "jwt-secret", {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: "bearer " + token,
          hospital: {
            hosp_id: hospuser.hosp_id,
            username: hospuser.hospital_username,
          },
        });
      } else {
        res.json({ success: false, msg: "Wrong Password" });
      }
    }
  });
});

//Get entire data
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log(req.user.hosp_id);
    let hosp_id = req.user.hosp_id;
    Hospital.find({ _id: hosp_id }, (err, hospital_info) => {
      if (err) {
        return { msg: "Unable to find the hospital" };
      } else {
        let data = {};
        data["hosp_info"] = hospital_info;
        let query = Case.find(
          { hospital_id: hosp_id },
          { hospital_id: 0, __v: 0 }
        );
        query.exec((err, cases) => {
          if (err) {
            res.status(404).json({ msg: "Error retrieving cases " + err });
          } else {
            data["cases"] = cases;
            res.json(data);
          }
        });
      }
    });
  }
);

router.get(
  "/getCase/:caseid",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let caseid = mongoose.Types.ObjectId(req.params.caseid);
    let query = Case.find({ _id: caseid });
    query.exec((err, casedata) => {
      if (err) {
        res.json({ msg: err });
      } else {
        res.json(casedata);
      }
    });
  }
);

router.put(
  "/updateStatus",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let caseid = mongoose.Types.ObjectId(req.body.caseid);
    let status = req.body.status;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/" + yyyy;
    console.log(today);

    Case.find({ _id: caseid }, (err, casedata) => {
      if (err) {
        res.json({ msg: err });
      } else if (casedata.length == 0) {
        res.json({ msg: "No Case found" });
      } else {
        Case.updateOne(
          { _id: caseid },
          { $set: { current_status: status, date_released: today } },
          (err, data) => {
            if (err) {
              res.json({ msg: "Failed to update" + err });
            } else {
              res.json({ msg: "Patient Status Updated Successfully" });
            }
          }
        );
      }
    });
  }
);

router.put(
  "/updateBedType",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let caseid = mongoose.Types.ObjectId(req.body.caseid);
    let bedtype = req.body.bedtype;
    Case.find({ _id: caseid }, (err, casedata) => {
      if (err) {
        res.json({ msg: err });
      } else if (casedata.length == 0) {
        res.json({ msg: "No Case found" });
      } else {
        Case.updateOne(
          { _id: caseid },
          { $set: { bed_type: bedtype } },
          (err, data) => {
            if (err) {
              res.json({ msg: "Failed to update" + err });
            } else {
              res.json({ msg: "Patient Bed Type Updated Successfully" });
            }
          }
        );
      }
    });
  }
);

router.post(
  "/addPatientData",
  passport.authenticate("jwt", { session: false }),
  upload.single("uploadFile"),
  (req, res, next) => {
    try {
      let hosp_id = req.user.hosp_id;
      // console.log(req.file.path);
      fs.readFile(req.file.path, async (err, patientData) => {
        if (err) {
          res.send(err);
          return;
        }
        let patientCSV = await neatCsv(patientData);
        //check beds available
        Case.find(
          { hospital_id: hosp_id },
          { hospital_id: 0, __v: 0 },
          (err, casedata) => {
            if (err) {
              res.send(err);
              return;
            } else {
              let normal_bed_used = casedata.filter(
                (obj) =>
                  obj.bed_type == "NORMAL_BED" &&
                  obj.current_status == "Hospitalized"
              ).length;
              let icu_bed_used = casedata.filter(
                (obj) =>
                  obj.bed_type == "ICU_BED" &&
                  obj.current_status == "Hospitalized"
              ).length;
              let vent_bed_used = casedata.filter(
                (obj) =>
                  obj.bed_type == "VENTILATOR_BED" &&
                  obj.current_status == "Hospitalized"
              ).length;
              console.log(
                normal_bed_used + " " + icu_bed_used + " " + vent_bed_used
              );
              let normal_bed_coming = patientCSV.filter(
                (obj) => obj.bed_type == "NORMAL_BED"
              ).length;
              let icu_bed_coming = patientCSV.filter(
                (obj) => obj.bed_type == "ICU_BED"
              ).length;
              let vent_bed_coming = patientCSV.filter(
                (obj) => obj.bed_type == "VENTILATOR_BED"
              ).length;
              console.log(
                normal_bed_coming + " " + icu_bed_coming + " " + vent_bed_coming
              );

              Hospital.find({ _id: hosp_id }, (err, info) => {
                if (err) {
                  console.log(err);
                  return false;
                } else {
                  let norm_tot_bed = info[0]["no_of_normal_beds"];
                  let icu_tot_bed = info[0]["no_of_icu_beds"];
                  let vent_tot_bed = info[0]["no_of_ventilators"];

                  let msg = "";
                  let flag = false;
                  if (normal_bed_coming > norm_tot_bed - normal_bed_used) {
                    msg += "Normal Bed,";
                    flag = true;
                  }
                  if (icu_bed_coming > icu_tot_bed - icu_bed_used) {
                    msg += "ICU Bed,";
                    flag = true;
                  }
                  if (vent_bed_coming > vent_tot_bed - vent_bed_used) {
                    msg += "Ventilator Bed,";
                    flag = true;
                  }

                  if (flag) {
                    msg = msg.substring(0, msg.length - 1);
                    msg +=
                      " will exhaust. Please upload correct number of cases or increase the number of beds by updating it.";
                    res.send({ msg: msg });
                    return;
                  } else {
                    patientCSV.forEach((element) => {
                      insertData(element, hosp_id);
                    });
                    res.send({ msg: "Successfully Added New Patients" });
                  }
                }
              });
            }
          }
        );
      });
    } catch (err) {
      console.log(err);
      res.json({ status: 400, msg: err });
    }
  }
);

let insertData = async function (patientToBeAdded, hosp_id) {
  let date_admitted = patientToBeAdded.date_admitted;
  date_admitted = date_admitted.replace(/-/g, "/");
  let newCase = new Case({
    name: patientToBeAdded.name,
    age: patientToBeAdded.age,
    gender: patientToBeAdded.gender,
    current_status: "Hospitalized",
    date_admitted: date_admitted,
    date_released: false,
    bed_type: patientToBeAdded.bed_type,
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

router.put(
  "/updateNormalBedCount",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let hosp_id = req.user.hosp_id;
    let count = req.body.count;
    Hospital.find({ _id: hosp_id }, (err, hospital_bed_data) => {
      if (err) {
        res.send({ msg: "Failed to Update Bed Count " + err });
      } else {
        Hospital.updateOne(
          { _id: hosp_id },
          { $set: { no_of_normal_beds: count } },
          (err) => {
            if (err) {
              res.send({ msg: "Failed to Update Bed Count " + err });
            } else {
              res.send({ msg: "Successfully Updated Bed Count" });
            }
          }
        );
      }
    });
  }
);

router.put(
  "/updateICUBedCount",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let hosp_id = req.user.hosp_id;
    let count = req.body.count;
    Hospital.find({ _id: hosp_id }, (err, hospital_bed_data) => {
      if (err) {
        res.send({ msg: "Failed to Update Bed Count " + err });
      } else {
        Hospital.updateOne(
          { _id: hosp_id },
          { $set: { no_of_icu_beds: count } },
          (err) => {
            if (err) {
              res.send({ msg: "Failed to Update Bed Count " + err });
            } else {
              res.send({ msg: "Successfully Updated Bed Count" });
            }
          }
        );
      }
    });
  }
);

router.put(
  "/updateVentilatorBedCount",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    let hosp_id = req.user.hosp_id;
    let count = req.body.count;
    Hospital.find({ _id: hosp_id }, (err, hospital_bed_data) => {
      if (err) {
        res.send({ msg: "Failed to Update Bed Count " + err });
      } else {
        Hospital.updateOne(
          { _id: hosp_id },
          { $set: { no_of_ventilators: count } },
          (err) => {
            if (err) {
              res.send({ msg: "Failed to Update Bed Count " + err });
            } else {
              res.send({ msg: "Successfully Updated Bed Count" });
            }
          }
        );
      }
    });
  }
);

/*
    ---------------------End of Normal Routes--------------
*/

/* 
----------------------------Backdoor/Danger Routes---------------------------
Do not touch these routes or call them with care.
Making these requests many time will cause many data to be added/updated to the database 
which will hamper the predictions
*/

/*
    ------------------Update Bulk Route-------------------
    Updates the current_status of all the data that is hospitalized.
    Since dates are string stored in DB and cannot be compared, 
    hence cannot be done within a date range.
    Can call with precautions.
*/

router.get("/dangerUpdateBulk", (req, res, next) => {
  let status = ["Recovered", "Death"];
  Case.find({ current_status: "Hospitalized" }, (err, cases) => {
    if (err) {
      res.json({ msg: err });
    } else {
      let i = 1;
      console.log(cases.length);
      let incr = Math.floor(cases.length / Math.floor(cases.length * 0.09));
      cases.sort(function () {
        return Math.random() - 0.5;
      });
      cases.forEach((element) => {
        let onecase = element;
        var parts = onecase["date_admitted"].split("/");
        var date_admitted = new Date(parts[2], parts[1] - 1, parts[0]);
        let end = new Date(
          date_admitted.getFullYear(),
          date_admitted.getMonth(),
          date_admitted.getDate() + Math.floor(Math.random() * (20 - 13) + 13)
        );
        let dd = String(end.getDate()).padStart(2, "0");
        let mm = String(end.getMonth() + 1).padStart(2, "0");
        let yyyy = end.getFullYear();
        let date_released = dd + "/" + mm + "/" + yyyy;
        let current_status;
        if (Math.floor(i % incr) == 0) {
          current_status = status[1];
        } else {
          current_status = status[0];
        }
        console.log(date_released, " ", current_status);
        i++;
        Case.updateOne(
          { _id: onecase["_id"] },
          {
            $set: {
              date_released: date_released,
              current_status: current_status,
            },
          },
          (err, data) => {
            if (err) {
              console.log({
                msg: "Failed to update" + err,
                status: data,
                caseno: i,
              });
            } else {
              console.log({
                msg: "Patient Updated Successfully",
                status: data,
                caseno: i,
              });
            }
          }
        );
      });
      res.json({ count: cases.length });
    }
  });
});

/*
    ------------------Add Bulk Route-------------------
    Adds dummy data to the database based on a date range 
    and the district. It asigns the cases randomly to a
    hospital. If called over and over again, it might insert 
    same data twice which will be tough to remove. 
    Can call with precautions.
*/
router.get("/dangerAddBulkData", (req, res, next) => {
  let startdate = req.query.startdate;
  let enddate = req.query.enddate;
  let threshold = req.query.threshold;
  let district = req.query.district;

  if (!startdate) {
    res.send({ msg: "Start Date Required" });
    return;
  } else {
    let date_split = startdate.split("/");
    startdate = new Date(date_split[2], date_split[1] - 1, date_split[0]);
    startdate.setDate(startdate.getDate()+1);
    console.log(startdate);
  }

  if (!enddate) {
    enddate = new Date();
  } else {
    let date_split = enddate.split("/");
    enddate = new Date(date_split[2], date_split[1] - 1, date_split[0]);
    enddate.setDate(enddate.getDate()+1);
  }
  console.log(enddate);

  if (!threshold) {
    res.send({ msg: "Threshold Required" });
    return;
  }

  if (!district) {
    res.send({ msg: "District Required" });
    return;
  }

  Hospital.find({ district: district.toUpperCase() }, (err, hospset) => {
    if (err) {
      res.send({ msg: "Error " + err });
      return;
    } else {
      let norm_overall = 0;
      let icu_overall = 0;
      let vent_overall = 0;
      let reset_startdate = new Date();
      reset_startdate.setDate(startdate.getDate());
      let reset_enddate = new Date();
      reset_enddate.setDate(enddate.getDate());

      for (let i = 0; i < hospset.length; i++) {
        let element = hospset[i];
        console.log(element.hospital_name);
        let query = Case.aggregate([
          {
            $match: {
              hospital_id: element._id,
              current_status: "Hospitalized",
            },
          },
          {
            $group: {
              _id: "$bed_type",
              count: { $sum: 1 },
            },
          },
        ]);
        query.exec((err, bedcounts) => {
          if (err) {
            res.send({ msg: "Error " + err });
            return;
          } else {
            let norm = 0;
            let icu = 0;
            let vent = 0;
            bedcounts.forEach((bedval) => {
              if (bedval._id == "NORMAL_BED") {
                norm = bedval.count;
              }
              if (bedval._id == "ICU_BED") {
                icu = bedval.count;
              }
              if (bedval._id == "VENTILATOR_BED") {
                vent = bedval.count;
              }
            });
            norm = Math.round(
              (threshold / 100) * (element.no_of_normal_beds - norm)
            );
            icu = Math.round(
              (threshold / 100) * (element.no_of_icu_beds - icu) * 0.15
            );
            vent = Math.round(
              (threshold / 100) * (element.no_of_ventilators - vent) * 0.125
            );
            let cases_to_be_inserted = norm + icu + vent;
            norm_overall += norm;
            icu_overall += icu;
            vent_overall += vent;
            if (cases_to_be_inserted > 0) {
              // console.log(startdate);
              // console.log(enddate);
              // console.log('--------------------------------------  ' + i);
              casesBulkAdd(norm, icu, vent, startdate, enddate, element._id);
              startdate = new Date(reset_startdate.getFullYear(), reset_startdate.getMonth()-1, reset_startdate.getDate());
              enddate = new Date(reset_enddate.getFullYear(), reset_enddate.getMonth()-1, reset_enddate.getDate());
            }
          }
          if (i == hospset.length - 1) {
            let overall = norm_overall + icu_overall + vent_overall;
            console.log("---------- " + overall + " " + norm_overall + " " + icu_overall + " " + vent_overall);
          }
        });
      }
      res.send({ msg: "All okay" });
    }
  });
});

let casesBulkAdd = async function (
  norm,
  icu,
  vent,
  start_date,
  end_date,
  hosp_id
) {
  // console.log(start_date)
  let revamp = new Date();
  revamp.setDate(start_date.getDate());
  let revamp_enddate = new Date();
  revamp_enddate.setDate(end_date.getDate());
  let date_diff =
    (end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24);

  //Normal Beds
  let norm_gap = Math.ceil(date_diff / norm);
  let norm_date_change = 1;
  if (norm_gap == 1) {
    norm_gap = 1;
    norm_date_change = Math.round(norm / date_diff);
  }
  for (let i = 0; i < norm; i++) {
    if (i % norm_date_change == 0) {
      start_date.setDate(start_date.getDate() + norm_gap);
    }
    if (start_date.getTime() >= end_date.getTime()) {
      start_date = new Date(revamp.getFullYear(), revamp.getMonth()-1, revamp.getDate());
      start_date.setDate(start_date.getDate() + Math.floor(Math.random() * 3));
    }
    // console.log(start_date);
    let genderSel = ["Male", "Female"];
    let gender = genderSel[Math.round(Math.random())];
    let name = random_name({ gender: gender.toLowerCase() });
    let age = Math.floor(Math.random() * (75 - 3) + 3);
    let dd = String(start_date.getDate()).padStart(2, "0");
    let mm = String(start_date.getMonth() + 1).padStart(2, "0");
    let yyyy = start_date.getFullYear();
    let date_admitted = dd + "/" + mm + "/" + yyyy;
    let newCase = new Case({
      name: name,
      age: age,
      gender: gender,
      current_status: "Hospitalized",
      date_admitted: date_admitted,
      date_released: false,
      bed_type: "NORMAL_BED",
      hospital_id: hosp_id,
    });
    await newCase.save((err, newcases) => {
      if (err) {
        console.log("Error - " + err);
      } else {
        // console.log(newcases._id);
      }
    });
  }

  //ICU Beds
  start_date = new Date(revamp.getFullYear(), revamp.getMonth()-1, revamp.getDate());
  end_date = new Date(revamp_enddate.getFullYear(), revamp_enddate.getMonth()-1, revamp_enddate.getDate());

  let icu_gap = Math.ceil(date_diff / icu);
  let icu_date_change = 1;
  if (icu_gap == 1) {
    icu_gap = 1;
    icu_date_change = Math.round(icu / date_diff);
  }
  for (let i = 0; i < icu; i++) {
    if (i % icu_date_change == 0) {
      start_date.setDate(start_date.getDate() + icu_gap);
    }
    if (start_date.getTime() >= end_date.getTime()) {
      start_date = new Date(revamp.getFullYear(), revamp.getMonth()-1, revamp.getDate());
    }
    let genderSel = ["Male", "Female"];
    let gender = genderSel[Math.round(Math.random())];
    let name = random_name({ gender: gender.toLowerCase() });
    let age = Math.floor(Math.random() * (75 - 3) + 3);
    let dd = String(start_date.getDate()).padStart(2, "0");
    let mm = String(start_date.getMonth() + 1).padStart(2, "0");
    let yyyy = start_date.getFullYear();
    let date_admitted = dd + "/" + mm + "/" + yyyy;
    let newCase = new Case({
      name: name,
      age: age,
      gender: gender,
      current_status: "Hospitalized",
      date_admitted: date_admitted,
      date_released: false,
      bed_type: "ICU_BED",
      hospital_id: hosp_id,
    });
    await newCase.save((err, newcases) => {
      if (err) {
        console.log("Error - " + err);
      } else {
        // console.log(newcases._id);
      }
    });
  }

  //Vent Beds
  start_date = new Date(revamp.getFullYear(), revamp.getMonth()-1, revamp.getDate());
  end_date = new Date(revamp_enddate.getFullYear(), revamp_enddate.getMonth()-1, revamp_enddate.getDate());

  let vent_gap = Math.ceil(date_diff / vent);
  let vent_date_change = 1;
  if (vent_gap == 1) {
    vent_gap = 1;
    vent_date_change = Math.round(vent / date_diff);
  }
  for (let i = 0; i < vent; i++) {
    if (i % vent_date_change == 0) {
      start_date.setDate(start_date.getDate() + vent_gap);
    }
    if (start_date.getTime() >= end_date.getTime()) {
      start_date = new Date(revamp.getFullYear(), revamp.getMonth()-1, revamp.getDate());
    }
    let genderSel = ["Male", "Female"];
    let gender = genderSel[Math.round(Math.random())];
    let name = random_name({ gender: gender.toLowerCase() });
    let age = Math.floor(Math.random() * (75 - 3) + 3);
    let dd = String(start_date.getDate()).padStart(2, "0");
    let mm = String(start_date.getMonth() + 1).padStart(2, "0");
    let yyyy = start_date.getFullYear();
    let date_admitted = dd + "/" + mm + "/" + yyyy;
    let newCase = new Case({
      name: name,
      age: age,
      gender: gender,
      current_status: "Hospitalized",
      date_admitted: date_admitted,
      date_released: false,
      bed_type: "VENTILATOR_BED",
      hospital_id: hosp_id,
    });
    await newCase.save((err, newcases) => {
      if (err) {
        console.log("Error - " + err);
      } else {
        // console.log(newcases._id);
      }
    });
  }
};

/*
End of Infrequent Routes
*/

module.exports = router;
