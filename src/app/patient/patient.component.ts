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

  addPatient(): void {

  }

  updatePatient(): void {

  }

  //reusable for create and update
  public savePatient(Patient patient): void {
    this.service.savePatient(patient);
  }

}
