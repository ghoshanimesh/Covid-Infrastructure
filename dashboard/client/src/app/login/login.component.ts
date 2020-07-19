import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private authService:AuthService, private flashMessage: FlashMessagesService, private router:Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }
    if(this.authService.validateUser(user)){
      this.authService.authenticateUser(user).subscribe(data => {
        if(data["success"]){
          console.log(data);
          this.authService.storeUserData(data["token"], data["hospital"]);
          this.flashMessage.show("You're logged in!", {cssClass: "alert-success"});
          this.router.navigate(['/dashboard']);
        }else{
          this.flashMessage.show(data["msg"], {cssClass: "alert-warning"});
          this.router.navigate(['/login']);
        }
      });
    }else{
      this.flashMessage.show("Please fill out the fields", {cssClass: "alert-danger"});
    }
  }

}
