const express = require('express');
const router = express.Router();
const fs = require("fs");
const neatCsv = require("neat-csv");

const mongoose = require('mongoose')
const Hospital = require("../models/hospital");
const Case = require("../models/cases");

router.get("/addHospital", (req,res,next)=>{
    fs.readFile("hospital_mh.csv", async(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        let datareadcsv = await neatCsv(data);
        console.log(datareadcsv);
        datareadcsv.forEach((element)=>{
            let newHospital = new Hospital({
                state: element.State,
                district: element.City,
                hospital_name: element.Hospital,
                hospital_addr: element.Address,
                hospitalized: [],
                deceased: [],
                recovered: []            
            });
            newHospital.save((err, hospital)=>{});            
        });        
    });
    res.send({msg: "All Hospitals Added"})
});

router.get("/addCases", (req,res,next)=>{
    insertCases()
    res.send({msg: "All Cases Added and Mapped"})
})

async function insertCases(){
    fs.readFile("cases.csv", async(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        let datareadcsv = await neatCsv(data);
        for(const element of datareadcsv){
            try{
                let newCase = new Case({
                    age: element.age,
                    gender: element.gender
                });
                let newCaseSaved = await newCase.save();
                let lastInsertedId = newCaseSaved._id
                var query = Hospital.aggregate([{ "$match": { "district": element.district } }, { $sample: { size: 1 } }]);
                // var query = Hospital.find({_id: "5edf6cd9111ff54dd4cb660b"})
                query.exec((err, hospital)=>{
                    if(err){
                        res.send("Err in retreiving random hospital");
                    }else{
                        var hosp_id = hospital[0]._id;
                        var status = element.status;
                        var date = element.date;
                        checkCaseFunction(hosp_id, status, date, hospital, lastInsertedId)

                    }
                });
            }catch(err){
                console.log('err' + err);
            }
        }
    });
}

var checkCaseFunction = function(hosp_id, status, date, hospital, lastInsertedId){
    if(status == "Hospitalized"){
        var match = hospital[0].hospitalized.filter(obj => obj.date == date);
        console.log(match.length);
        if(match.length == 0){
            //Insert a new case object with date
            var case_data = {
                date: date,
                cases: [
                    {case_id: lastInsertedId}
                ]
            }
            console.log(case_data);
            var new_query = Hospital.updateOne({'_id': hosp_id}, {$push:{"hospitalized" : case_data}});
            executeQuery(new_query);
        }else{
            //Find the date and insert it in there
            var new_query = Hospital.update({'_id': hosp_id}, {$push:{"hospitalized.$[elem].cases" : {case_id : lastInsertedId}}}, { multi: true, arrayFilters: [ { "elem.date": date } ] });
            executeQuery(new_query);
        } 
    }else if(status == "Recovered"){
        var match = hospital[0].recovered.filter(obj => obj.date == date);
        console.log(match.length);
        if(match.length == 0){
            //Insert a new case object with date
            var case_data = {
                date: date,
                cases: [
                    {case_id: lastInsertedId}
                ]
            }
            console.log(case_data);
            var new_query = Hospital.updateOne({'_id': hosp_id}, {$push:{"recovered" : case_data}});
            executeQuery(new_query);
        }else{
            //Find the date and insert it in there
            var new_query = Hospital.update({'_id': hosp_id}, {$push:{"recovered.$[elem].cases" : {case_id : lastInsertedId}}}, { multi: true, arrayFilters: [ { "elem.date": date } ] });
            executeQuery(new_query);
        }
    }else if(status == "Deceased"){
        var match = hospital[0].deceased.filter(obj => obj.date == date);
        console.log(match.length);
        if(match.length == 0){
            //Insert a new case object with date
            var case_data = {
                date: date,
                cases: [
                    {case_id: lastInsertedId}
                ]
            }
            console.log(case_data);
            var new_query = Hospital.updateOne({'_id': hosp_id}, {$push:{"deceased" : case_data}});
            executeQuery(new_query);
        }else{
            //Find the date and insert it in there
            var new_query = Hospital.update({'_id': hosp_id}, {$push:{"deceased.$[elem].cases" : {case_id : lastInsertedId}}}, { multi: true, arrayFilters: [ { "elem.date": date } ] });
            executeQuery(new_query);
        }
    }
}

var executeQuery = function(new_query){
    new_query.exec((err,hospital_new)=>{
        console.log('Updated success');
        console.log(hospital_new);
    })
}

// ------------------------ Other Routes -----------------------------------------
router.get("/getHospitalCountWithDates", (req,res,next)=>{
    let query = Hospital.find({}, {__v: 0});
    query.exec((err, hospital) => {
        if(err){
            console.log("Herereee");
            res.status(404).json({msg: "Error retrieving hospital with id " + errr})
        }else{
            // res.send(hospital);
            let results = [];

            let hospital_count = 0;
            hospital.forEach((data) => {
                hospital_count++;
                let hosp_count = 0;
                let dec_count = 0;
                let rec_count = 0;                
                let hosp_by_date = [];
                let dec_by_date = [];
                let rec_by_date = [];

                data.hospitalized.forEach((ele)=>{
                    let hos_date = {
                        date: ele.date,
                        count: ele.cases.length
                    }
                    hosp_count = hosp_count + ele.cases.length;
                    hosp_by_date.push(hos_date);
                })

                data.deceased.forEach((ele)=>{
                    let dec_date = {
                        date: ele.date,
                        count: ele.cases.length
                    }
                    dec_by_date.push(dec_date);
                    dec_count = dec_count + ele.cases.length;
                })

                data.recovered.forEach((ele)=>{
                    let rec_date = {
                        date: ele.date,
                        count: ele.cases.length
                    }
                    rec_by_date.push(rec_date);
                    rec_count = rec_count + ele.cases.length;
                })
                let res = {
                    hospital_name: data.hospital_name,
                    hospitalized: hosp_by_date,
                    deceased: dec_by_date,
                    recovered: rec_by_date
                };
                results.push(res);    
                console.log("Hospitalized - " + hosp_count + " Deceased - " + dec_count + " Recovered - " + rec_count + " Count - " + hospital_count)
            });
            res.send(results)
        }
    });
})

router.get("/getHospitalOnDistrict/:district", (req,res,next)=>{
    console.log(req.params.district);
    let query = Hospital.find({district: req.params.district}, {__v: 0, hospitalized: 0, deceased:0, recovered: 0, state:0, district: 0});
    query.exec((err, data) => {
        if(err){
            console.log("Herereee");
            res.status(404).json({msg: "Error retrieving hospitals" + errr})
        }else{
            res.send(data);
        }
    });
})

router.get("/getCountOfHospital/:hosp_id", (req, res, next)=> {
    let query = Hospital.find({_id: req.params.hosp_id}, {__v: 0});
    query.exec((err, data) => {
        let hosp_count = 0;
        let dec_count = 0;
        let rec_count = 0;                
        let hosp_by_date = [];
        let dec_by_date = [];
        let rec_by_date = [];

        data[0].hospitalized.forEach((ele)=>{
            let hos_date = {
                date: ele.date,
                count: ele.cases.length
            }
            hosp_count = hosp_count + ele.cases.length;
            hosp_by_date.push(hos_date);
        })

        data[0].deceased.forEach((ele)=>{
            let dec_date = {
                date: ele.date,
                count: ele.cases.length
            }
            dec_by_date.push(dec_date);
            dec_count = dec_count + ele.cases.length;
        })

        data[0].recovered.forEach((ele)=>{
            let rec_date = {
                date: ele.date,
                count: ele.cases.length
            }
            rec_by_date.push(rec_date);
            rec_count = rec_count + ele.cases.length;
        })
        let results = {
            hospital_name: data[0].hospital_name,
            hospitalized: hosp_by_date,
            deceased: dec_by_date,
            recovered: rec_by_date
        };
        res.send(results);
    })
})

module.exports = router;