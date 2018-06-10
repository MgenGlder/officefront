import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class PatientService {
    // Remember, using the dollar in the variable name of an observable is considered to be best practice
    patients: Observable<Response>;
    constructor(private http: Http) {
        console.log('fetching all patients using the patients services...');
        this.patients = this.fetchAllPatients();
    }

    public getAllPatients(): Observable<Response> {
        return this.patients;
    }

    public fetchAllPatients() {
        return this.http.get('http://localhost:8080/api/patients/all');
    }

    public createPatient(newPatient): Observable<Response> {
        return this.http.post('http://localhost:8080/api/patient/create', newPatient);
    }

}
