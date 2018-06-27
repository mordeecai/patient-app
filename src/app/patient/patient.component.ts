import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from './patient';
import { Address } from './address';
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
patientStatus: boolean = false;

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
      if(this.patient) {
         (<HTMLInputElement>document.getElementById("active")).checked = this.patient.active;
      }
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

      this.dataReady = (this.codes.length > 0);
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
    var firstName = (<HTMLInputElement>document.getElementById("first-name")).value;
    var lastName = (<HTMLInputElement>document.getElementById("last-name")).value;
    var contact = (<HTMLInputElement>document.getElementById("contact")).value;
    var active = (<HTMLInputElement>document.getElementById("active")).checked;
    patient.firstName = firstName;
    patient.lastName = lastName;
    patient.contactNumber = contact
    patient.active = active

    var add1 = (<HTMLInputElement>document.getElementById("add1")).value;
    var add2 = (<HTMLInputElement>document.getElementById("add2")).value;
    var city = (<HTMLInputElement>document.getElementById("city")).value;
    var postalCode = (<HTMLInputElement>document.getElementById("postal-code")).value;

    let address: Address = new Address();

    address.address1 = add1;
    address.address2 = add1;
    address.city = add1;
    address.postalCode = postalCode;
    patient.addresses = [address];

    this.service.savePatient(patient).subscribe(p => {
      alert(`Patient is added! (${p.firstName} ${p.lastName})`)
    });

    this.returnToList();
  }

  updatePatient(): void {
    var firstName = (<HTMLInputElement>document.getElementById("first-name")).value;
    var lastName = (<HTMLInputElement>document.getElementById("last-name")).value;
    var contact = (<HTMLInputElement>document.getElementById("contact")).value;
    var active = (<HTMLInputElement>document.getElementById("active")).checked;
    this.patient.firstName = firstName;
    this.patient.lastName = lastName;
    this.patient.contactNumber = contact;
    this.patient.active = active;

    this.service.savePatient(this.patient).subscribe(p => {
      alert(`Patient is updated! (${p.firstName} ${p.lastName})`)
    });

    this.returnToList();
  }

  returnToList(): void {
    this.router.navigateByUrl('/patient-list');
  }

  cancel(): void {
    this.router.navigateByUrl('/patient-list');
  }

}
