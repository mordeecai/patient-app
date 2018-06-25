import { Injectable } from '@angular/core';
import { Patient } from './patient/patient'
import { Address } from './patient/address'
import { EXAMPLE_DATA } from './patient-table/patient-table-datasource'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getPatients() : Observable<Patient[]> {
    return of(EXAMPLE_DATA);
  }
}
