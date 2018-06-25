import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './patient/patient.component'
import { PatientTableComponent } from './patient-table/patient-table.component'

const routes: Routes = [
  { path: '', redirectTo: '/patient-list', pathMatch: 'full' },
  { path: 'patient-list', component: PatientTableComponent },
  { path: 'create', component: PatientComponent },
  { path: 'patient/:id', component: PatientComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
