import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { UpdatebedsComponent } from './updatebeds/updatebeds.component';

export function tokenGetter() {
  return localStorage.getItem("id_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    UpdateStatusComponent,
    UpdatebedsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    DataTablesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
