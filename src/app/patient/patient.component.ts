import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from './patient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
countries: any = {};
codes: string[] = [];
dataReady: boolean = false;
patient: Patient;

  constructor(
    private service : PatientService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPatient();
    this.init();
  }

  getPatient() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getPatient(id).toPromise().then(p => {
      this.patient = p;
      console.log("Patient: " + JSON.stringify(this.patient));
    })
    console.log("id: " + id);
  }

  init() {
    this.service.getCountries().toPromise().then(response => {
      this.countries = response;
      Object.keys(this.countries).sort().forEach(key => {
        this.codes.push(key)
        //console.log("key: " + key);
      });

      if(this.codes.length > 0) {
        this.dataReady = 0;
      }
    });

    console.log("Countries: " + JSON.stringify(this.countries));
  }

  public save(): void {
    if(this.patient) {
      this.updatePatient();
    } else {
      this.addPatient();
    }
  }

  addPatient(): void {
    patient: Patient = new Patient();
    var firstName = document.getElementById("first-name");
    patient.firstName = firstName;
    this.service.savePatient(patient);
  }

  updatePatient(): void {
    var firstName = document.getElementById("first-name");
    this.patient.firstName = firstName;
    this.service.savePatient(this.patient);
  }

}
