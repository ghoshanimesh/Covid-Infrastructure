import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-updatebeds',
  templateUrl: './updatebeds.component.html',
  styleUrls: [
    '../../assets/css/dashboard-style.css',
    '../../assets/css/dashboard-components.css',
    './updatebeds.component.css',
  ],
})
export class UpdatebedsComponent implements OnInit {
  hosp_name: String;
  normal_beds: any
  icu_beds: any
  vent_beds: any
  district: any
  state: any

  constructor(private authService: AuthService,private router:Router) {
    let hosp = localStorage.getItem('hospital');
    this.hosp_name = JSON.parse(hosp)['hospital_name'];
    this.normal_beds = JSON.parse(hosp)['no_of_normal_beds'];
    this.icu_beds = JSON.parse(hosp)['no_of_icu_beds'];
    this.vent_beds = JSON.parse(hosp)['no_of_ventilators'];
    this.district = JSON.parse(hosp)['district'].toLowerCase();
    this.state = JSON.parse(hosp)['state'];
    console.log(this.hosp_name);
   }

  ngOnInit(): void {
  }

  updateNormalBedCount(){
    let componentthis = this;

    let input = '<div class="form-group">'+
    '    <label>Normal Bed Count</label>'+
    '       <input type="text" class="form-control" id="normalcount" value="'+ this.normal_beds +'">'+
    '</div>';    

    Swal.fire({
      title: 'Update Bed Count',
      html: input,
      confirmButtonText: 'Update Count',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([$('#normalcount').val()]);
        });
      },
    })
      .then(function (result) {
        let newcount = result["value"][0];
        console.log(newcount);
        componentthis.authService.updateNormalBedCount(newcount).subscribe((data)=>{
          Swal.fire(data["msg"]);
          componentthis.router.navigate(['/dashboard']);
        })
      })
      .catch(Swal.noop);
  }

  updateICUBedCount(){
    let componentthis = this;

    let input = '<div class="form-group">'+
    '    <label>ICU Bed Count</label>'+
    '       <input type="text" class="form-control" id="icucount" value="'+ this.icu_beds +'">'+
    '</div>';    

    Swal.fire({
      title: 'Update Bed Count',
      html: input,
      confirmButtonText: 'Update Count',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([$('#icucount').val()]);
        });
      },
    })
      .then(function (result) {
        let newcount = result["value"][0];
        console.log(newcount);
        componentthis.authService.updateICUBedCount(newcount).subscribe((data)=>{
          Swal.fire(data["msg"]);
          componentthis.router.navigate(['/dashboard']);
        })
      })
      .catch(Swal.noop);
  }

  updateVentBedCount(){
    let componentthis = this;

    let input = '<div class="form-group">'+
    '    <label>Ventilator Bed Count</label>'+
    '       <input type="text" class="form-control" id="ventcount" value="'+ this.vent_beds +'">'+
    '</div>';    

    Swal.fire({
      title: 'Update Bed Count',
      html: input,
      confirmButtonText: 'Update Count',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([$('#ventcount').val()]);
        });
      },
    })
      .then(function (result) {
        let newcount = result["value"][0];
        console.log(newcount);
        componentthis.authService.updateVentBedCount(newcount).subscribe((data)=>{
          Swal.fire(data["msg"]);
          componentthis.router.navigate(['/dashboard']);
        })
      })
      .catch(Swal.noop);
  }

  logout(){
    this.authService.logout();
  }

}
