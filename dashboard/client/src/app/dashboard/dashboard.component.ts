import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../../assets/css/dashboard-style.css',
    '../../assets/css/dashboard-components.css',
    '../../assets/css/dataTables.bootstrap4.min.css',
    '../../assets/css/select.bootstrap4.min.css',
    './dashboard.component.css',
  ],
})
export class DashboardComponent implements OnInit {
  dtOption: any = {};
  hosp_data: Object;
  cases: any;
  hospital_name: String;
  hospital_loc: String;
  hospitalized: Number;
  recovered: Number;
  death: Number;
  norm_used_bed: Number;
  norm_tot_bed: Number;
  icu_used_bed: Number;
  icu_tot_bed: Number;
  vent_used_bed: Number;
  vent_tot_bed: Number;
  uploadedFiles: any;
  fileLabel: String = "Browse Patients Records File (only .csv)";

  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    let i = 1;
    this.authService.getHospitalInfo().subscribe((hospinfo) => {
      this.hosp_data = hospinfo['hosp_info'][0];
      console.log(this.hosp_data);
      this.cases = hospinfo['cases'];
      console.log(this.cases);
      localStorage.setItem('hospital', JSON.stringify(this.hosp_data));
      this.dtOption = {
        data: this.cases,
        columns: [
          {
            title: '#',
            data: function () {
              return i++;
            },
          },
          { title: 'Patient Name', data: 'name' },
          { title: 'Age', data: 'age' },
          { title: 'Gender', data: 'gender' },
          { title: 'Date Admitted', data: 'date_admitted' },
          {
            title: 'Date Released',
            data: function (data) {
              if (data['date_released'] == 'false') {
                return '';
              } else {
                return data['date_released'];
              }
            },
          },
          {
            title: 'Bed Type',
            data: function (data) {
              if (data['bed_type'] == 'NORMAL_BED') {
                return 'Normal Bed';
              } else if (data['bed_type'] == 'ICU_BED') {
                return 'ICU Bed';
              } else if (data['bed_type'] == 'VENTILATOR_BED') {
                return 'Ventilator Bed';
              }
            },
          },
          { title: 'Status', data: 'current_status' },
          {
            title: 'Action',
            data: function (data) {
              if (data['current_status'] == 'Hospitalized') {
                return (
                  "<a href='/updateStatus/" +
                  data['_id'] +
                  "' class='btn btn-dark'>Update Details</a>"
                );
              } else {
                return '';
              }
            },
          },
        ],
        paging: true,
        info: true,
        ordering: true,
        pagingType: 'full_numbers',
      };
      $(() => {
        $('table#table-1').DataTable(this.dtOption);
      });

      //Assigning other info
      this.hospital_name = this.hosp_data['hospital_name'];
      this.hospital_loc =
        this.hosp_data['district']
          .split(' ')
          .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
          .join(' ') +
        ', ' +
        this.hosp_data['state'];

      this.recovered = this.cases.filter(
        (obj) => obj.current_status == 'Recovered'
      ).length;

      this.hospitalized = this.cases.filter(
        (obj) => obj.current_status == 'Hospitalized'
      ).length;

      this.death = this.cases.filter(
        (obj) => obj.current_status == 'Death'
      ).length;

      this.norm_tot_bed = this.hosp_data['no_of_normal_beds'];
      this.icu_tot_bed = this.hosp_data['no_of_icu_beds'];
      this.vent_tot_bed = this.hosp_data['no_of_ventilators'];

      this.norm_used_bed = this.cases.filter(
        (obj) =>
          obj.bed_type == 'NORMAL_BED' && obj.current_status == 'Hospitalized'
      ).length;
      this.icu_used_bed = this.cases.filter(
        (obj) =>
          obj.bed_type == 'ICU_BED' && obj.current_status == 'Hospitalized'
      ).length;
      this.vent_used_bed = this.cases.filter(
        (obj) =>
          obj.bed_type == 'VENTILATOR_BED' &&
          obj.current_status == 'Hospitalized'
      ).length;
    });
  }

  fileChange(element){
    this.uploadedFiles = element.target.files;
    this.fileLabel = this.uploadedFiles[0].name;
  }

  upload(){
    let formdata = new FormData();
    formdata.append("uploadFile", this.uploadedFiles[0], this.uploadedFiles[0].name);
    this.authService.addPatientsData(formdata).subscribe((data)=>{
      Swal.fire(data["msg"]);
      location.reload();
    })
  }

  logout(){
    this.authService.logout();
  }
}
