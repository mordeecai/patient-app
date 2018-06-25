import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientTableComponent } from './patient-table/patient-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
