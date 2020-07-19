import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';;
import { from } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:HttpClient, public jwtHelper: JwtHelperService) { }

  validateUser(user){
    if(user.username==undefined || user.password==undefined){
      return false;
    }else{
      return true;
    }
  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    return this.http.post("http://localhost:3000/authenticate/", user);
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    return token;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getCaseInfo(id){
    this.loadToken();
    // console.log(this.authToken);
    return this.http.get("http://localhost:3000/getCase/" + id, {headers: {"Authorization": this.authToken}});    
  }

  getHospitalInfo(){
    this.loadToken();
    // console.log(this.authToken);
    return this.http.get("http://localhost:3000/profile", {headers: {"Authorization": this.authToken}});
  }

  updateCaseStatus(caseid, status){
    this.loadToken();
    return this.http.put("http://localhost:3000/updateStatus", {"caseid": caseid, "status": status}, {headers: {"Authorization": this.authToken}});
  }

  updateBedType(caseid, bedtype){
    this.loadToken();
    return this.http.put("http://localhost:3000/updateBedType", {"caseid": caseid, "bedtype": bedtype}, {headers: {"Authorization": this.authToken}});
  }

  addPatientsData(formdata){
    this.loadToken();
    return this.http.post("http://localhost:3000/addPatientData", formdata, {headers: {"Authorization": this.authToken}})
  }

  updateNormalBedCount(count){
    this.loadToken();
    return this.http.put("http://localhost:3000/updateNormalBedCount", {count: count}, {headers: {"Authorization": this.authToken}})
  }

  updateICUBedCount(count){
    this.loadToken();
    return this.http.put("http://localhost:3000/updateICUBedCount", {count: count}, {headers: {"Authorization": this.authToken}})
  }

  updateVentBedCount(count){
    this.loadToken();
    return this.http.put("http://localhost:3000/updateVentilatorBedCount", {count: count}, {headers: {"Authorization": this.authToken}})
  }
}
