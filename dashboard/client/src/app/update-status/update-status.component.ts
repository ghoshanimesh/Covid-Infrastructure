import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare let $;

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: [
    '../../assets/css/dashboard-style.css',
    '../../assets/css/dashboard-components.css',
    './update-status.component.css',
  ],
})
export class UpdateStatusComponent implements OnInit {
  case_id = this.route.snapshot.paramMap.get('id');
  hosp_name: String;
  age: Number;
  bedtype;
  date_admitted;
  date_released;
  gender;
  name;
  current_status: String;

  constructor(private route: ActivatedRoute, public authService: AuthService, private router:Router) {
    let hosp = localStorage.getItem('hospital');
    this.hosp_name = JSON.parse(hosp)['hospital_name'];
    console.log(this.hosp_name);
  }

  ngOnInit(): void {
    this.authService.getCaseInfo(this.case_id).subscribe((data) => {
      console.log(data[0]['date_released']);
      this.age = data[0]['age'];
      this.bedtype =
        data[0]['bed_type'] == 'NORMAL_BED'
          ? 'Normal Bed'
          : data[0]['bed_type'] == 'ICU_BED'
          ? 'ICU Bed'
          : 'Ventilator Bed';
      this.date_admitted = data[0]['date_admitted'];
      this.date_released =
        data[0]['date_released'] == 'false' ? 'None' : data[0]['date_released'];
      this.gender = data[0]['gender'];
      this.name = data[0]['name'];
      this.current_status = data[0]['current_status'];
    });
  }

  openBedModal() {
    let componentthis = this;
    var input1 =
      '<div class="form-group">' +
      '  <label>Default Select</label>' +
      '   <select class="form-control" id="bedtype">' +
      '     <option value="NORMAL_BED" selected="true">Normal Bed</option>' +
      '     <option value="ICU_BED">ICU Bed</option>' +
      '     <option value="VENTILATOR_BED">Ventilator Bed</option>' +
      '   </select>' +
      '</div>';

    Swal.fire({
      title: 'Update Bed Type',
      html: input1,
      confirmButtonText: 'Update Bed',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([$('#bedtype').val()]);
        });
      },
    })
      .then(function (result) {
        let newbedtype = result["value"][0];
        console.log(newbedtype);
        componentthis.authService.updateBedType(componentthis.case_id,newbedtype).subscribe((data)=>{
          console.log(data);
          Swal.fire(data["msg"]);
          componentthis.router.navigate(['/dashboard'])  
        })
      })
      .catch(Swal.noop);
  }

  updateStatus(status) {
    this.authService
      .updateCaseStatus(this.case_id, status)
      .subscribe((data) => {
        console.log(data);
        Swal.fire(data["msg"]);
        this.router.navigate(['/dashboard'])
      });
  }

  openStatusModal() {
    let componentthis = this;
    var input2 =
      '<div class="form-group">' +
      '<label>Default Select</label>' +
      '   <select class="form-control" id="status">' +
      '     <option value="Hospitalized" selected="true" disabled="disabled">Hospitalized</option>' +
      '     <option value="Recovered">Recovered</option>' +
      '     <option value="Death">Death</option>' +
      '   </select>' +
      '</div>';
    Swal.fire({
      title: 'Update Patient Details',
      html: input2,
      confirmButtonText: 'Update Status',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([$('#status').val()]);
        });
      },
    })
      .then(function (result) {
        if (result['value'][0] == null) {
          Swal.fire('Please select some other status');
        } else {
          console.log(result['value'][0]);
          componentthis.updateStatus(result['value'][0]);
        }
      })
      .catch(Swal.noop);
  }

  logout(){
    this.authService.logout();
  }

}
