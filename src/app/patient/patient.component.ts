import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from './patient';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router) { }

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
    var patient: Patient = new Patient();
    var firstName = document.getElementById("first-name").value;
    patient.firstName = firstName;
    this.service.savePatient(patient);
  }

  updatePatient(): void {
    var firstName = document.getElementById("first-name").value;
    this.patient.firstName = firstName;
    this.service.savePatient(this.patient);
  }

  cancel(): void {
    this.router.navigateByUrl('/patient-list');
  }

}
