import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService as AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { from } from 'rxjs';
import { UpdatebedsComponent } from './updatebeds/updatebeds.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'updateStatus/:id', component: UpdateStatusComponent, canActivate: [AuthGuard]},
  { path: 'updateBeds', component: UpdatebedsComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full'}   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
