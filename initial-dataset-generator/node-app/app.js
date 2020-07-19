var random_name = require("random-indian-name");
var fs = require("fs");

let jsondata = [];

function generateRecoveredDataset(startdate, enddate, district, count) {
  let genderSel = ["Male", "Female"];
  let bedTypeSel = ["NORMAL_BED", "ICU_BED", "VENTILATOR_BED"];
  let n = 2;
  // let startdate = new Date("Mar 9, 2020");
  let max = 5;
  let min = 1;

  for (let i = 0; i < count; i++) {
    let gender = genderSel[Math.round(Math.random())];
    let name = random_name({ gender: gender.toLowerCase() });
    let age = Math.floor(Math.random() * (75 - 3) + 3);
    let current_status = "Recovered";
    let type_of_bed;
    let bedjump = Math.floor(Math.random() * (251 - 235) + 235);

    if (i % bedjump <= 235) {
      type_of_bed = bedTypeSel[0];
    } else if (i % bedjump > 245 && i % bedjump <= 250) {
      type_of_bed = bedTypeSel[2];
    } else {
      type_of_bed = bedTypeSel[1];
    }
    //Min Max defines that for i cases, the date would change after n cases has elapsed
    if (i > 10 && i <= 50) {
      min = 11;
      max = 20;
    } else if (i > 50 && i <= 500) {
      min = 35;
      max = 50;
    } else if (i > 500 && i <= 5000) {
      min = 350;
      max = 500;
    } else if (i > 5000) {
      min = 1250;
      max = 1500;
    }
    if(startdate.getTime() == enddate.getTime()){
      startdate = new Date("June 19, 2020");
    }
    if (n <= 0) {
      n = Math.floor(Math.random() * (max - min) + min);
      //will skip date by 1 to 3 days for next date
      startdate.setDate(
        startdate.getDate() + + Math.floor(Math.random() * (3 - 1) + 1)
      );
    }
    let curr_case_data = {
      district: district,
      name: name,
      gender: gender,
      age: age,
      current_status: current_status,
      type_of_bed: type_of_bed,
      date_admitted: startdate.toLocaleDateString("en-IN"),
      date_released: new Date(
        startdate.getFullYear(),
        startdate.getMonth(),
        startdate.getDate() + Math.floor(Math.random() * (20 - 13) + 13)
      ).toLocaleDateString("en-IN"),
    };
    jsondata.push(curr_case_data);
    n--;
  }
  console.log(district + " Done Cases - " + count);
}


function generateDeathDataset(startdate, enddate, district, count) {
  let genderSel = ["Male", "Female"];
  let bedTypeSel = ["NORMAL_BED", "ICU_BED", "VENTILATOR_BED"];
  let n = 2;
  // let startdate = new Date("Mar 9, 2020");
  let max = 5;
  let min = 1;

  for (let i = 0; i < count; i++) {
    let gender = genderSel[Math.round(Math.random())];
    let name = random_name({ gender: gender.toLowerCase() });
    let age = Math.floor(Math.random() * (75 - 3) + 3);
    let current_status = "Death";
    let type_of_bed;
    let bedjump = Math.floor(Math.random() * (251 - 235) + 235);

    if (i % bedjump <= 235) {
      type_of_bed = bedTypeSel[0];
    } else if (i % bedjump > 245 && i % bedjump <= 250) {
      type_of_bed = bedTypeSel[2];
    } else {
      type_of_bed = bedTypeSel[1];
    }
    //Min Max defines that for i cases, the date would change after n cases has elapsed
    if (i > 10 && i <= 50) {
      min = 11;
      max = 20;
    } else if (i > 50 && i <= 500) {
      min = 35;
      max = 50;
    } else if (i > 500 && i <= 5000) {
      min = 350;
      max = 500;
    } else if (i > 5000) {
      min = 1250;
      max = 1500;
    }
    if(startdate.getTime() == enddate.getTime()){
      startdate = new Date("June 29, 2020");
    }
    if (n <= 0) {
      n = Math.floor(Math.random() * (max - min) + min);
      //will skip dates between 1-3 for next date
      startdate.setDate(
        startdate.getDate() + Math.floor(Math.random() * (5 - 2) + 2)
      );
    }
    let curr_case_data = {
      district: district,
      name: name,
      gender: gender,
      age: age,
      current_status: current_status,
      type_of_bed: type_of_bed,
      date_admitted: startdate.toLocaleDateString("en-IN"),
      date_released: new Date(
        startdate.getFullYear(),
        startdate.getMonth(),
        startdate.getDate() + Math.floor(Math.random() * (20 - 13) + 13)
      ).toLocaleDateString("en-IN"),
    };
    jsondata.push(curr_case_data);
    n--;
  }
  console.log(district + " Done Cases - " + count);
}

function generateHospDataset(startdate, enddate, district, count) {
  let genderSel = ["Male", "Female"];
  let bedTypeSel = ["NORMAL_BED", "ICU_BED", "VENTILATOR_BED"];
  let n = 350;
  // let startdate = new Date("May 2, 2020");
  // let enddate = new Date("June 19, 2020");
  let max = 35;
  let min = 25;

  for (let i = 0; i < count; i++) {
    let gender = genderSel[Math.round(Math.random())];
    let name = random_name({ gender: gender.toLowerCase() });
    let age = Math.floor(Math.random() * (75 - 3) + 3);
    let current_status = "Hospitalized";
    let type_of_bed;
    let bedjump = Math.floor(Math.random() * (251 - 235) + 235);

    if (i % bedjump <= 235) {
      type_of_bed = bedTypeSel[0];
    } else if (i % bedjump > 245 && i % bedjump <= 250) {
      type_of_bed = bedTypeSel[2];
    } else {
      type_of_bed = bedTypeSel[1];
    }
    //Min Max defines that for i cases, the date would change after n cases has elapsed
    if (i > 10 && i <= 250) {
      min = 25;
      max = 50;
    }else if (i > 250 && i<=500) {
      min = 50;
      max = 65;
    }else if (i > 500 && i<=1500) {
      min = 65;
      max = 75;
    }else if(i > 1500 && i<=2500){
      min = 75;
      max = 90;
    }else{
      min = 90;
      max = 105;
    }
    if(startdate.getTime() == enddate.getTime()){
      startdate = new Date("June 19, 2020");
    }
    if (n <= 0) {
      n = Math.floor(Math.random() * (max - min) + min);
      //will not skip dates. Increments to the next day only
      startdate.setDate(
        startdate.getDate() + 1
      );
    }
    let curr_case_data = {
      district: district,
      name: name,
      gender: gender,
      age: age,
      current_status: current_status,
      type_of_bed: type_of_bed,
      date_admitted: startdate.toLocaleDateString("en-IN"),
      date_released: "",
    };
    jsondata.push(curr_case_data);
    n--;
  }
  console.log(district + " Done Cases - " + count);
}

function generateManipulatedData(startdate, count) {
  let genderSel = ["Male", "Female"];
  let bedTypeSel = ["NORMAL_BED", "ICU_BED", "VENTILATOR_BED"];
  let districts = ["Mumbai", "Thane", "Pune"];

  for (let i = 0; i < count; i++) {
    let gender = genderSel[Math.round(Math.random())];
    let name = random_name({ gender: gender.toLowerCase() });
    let age = Math.floor(Math.random() * (75 - 3) + 3);
    let current_status = "Recovered";
    let type_of_bed;
    let bedjump = Math.floor(Math.random() * (251 - 235) + 235);

    if (i % bedjump <= 235) {
      type_of_bed = bedTypeSel[0];
    } else if (i % bedjump > 245 && i % bedjump <= 250) {
      type_of_bed = bedTypeSel[2];
    } else {
      type_of_bed = bedTypeSel[1];
    }
    let curr_case_data = {
      district: districts[Math.floor(Math.random() * 3)],
      name: name,
      gender: gender,
      age: age,
      current_status: current_status,
      type_of_bed: type_of_bed,
      date_admitted: startdate.toLocaleDateString("en-IN"),
      date_released: new Date(
        startdate.getFullYear(),
        startdate.getMonth(),
        startdate.getDate() + Math.floor(Math.random() * (20 - 13) + 13)
      ).toLocaleDateString("en-IN"),
    };
    jsondata.push(curr_case_data);
  }
  console.log(startdate.toLocaleDateString("en-IN") + " Done Cases - " + count);
}

generateHospDataset(new Date("June 19, 2020"), new Date("June 29, 2020"), "Mumbai", 20549);
generateHospDataset(new Date("June 19, 2020"), new Date("June 29, 2020"), "Thane", 15822);
generateHospDataset(new Date("June 19, 2020"), new Date("June 29, 2020"), "Pune", 23855);

// generateManipulatedData(new Date("Mar 30, 2020"), 128);

fs.writeFile("Hospitalized.json", JSON.stringify(jsondata), function (
  err
) {
  if (err) throw err;
  console.log("Saved!");
});
