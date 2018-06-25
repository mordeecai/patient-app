import { Injectable } from '@angular/core';
import { Patient } from './patient/patient'
import { Address } from './patient/address'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPatients() : Observable<Patient[]> {
    return this.http.get<Patient[]>('http://localhost:8080/patients/find');
  }

  getPatient(id: number) : Observable<Patient> {
    console.log("getPatient() id: " + id);
    let url = `http://localhost:8080/patients/${id}`;
    console.log("getPatient() url: " + url);
    return this.http.get<Patient>(url);
  }

  savePatient(Patient patient) : void {
    this.http.post<Patient>('http://localhost:8080/patients/save', patient, httpOptions);
  }

  getCountries() : Observable<any[]> {
    return this.http.get<any>('http://localhost:8080/patients/countries');
  }

  handlePromiseError(error: Response) {
    console.error(error);
    throw(error);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('PatientService: ' + message);
  }
}
