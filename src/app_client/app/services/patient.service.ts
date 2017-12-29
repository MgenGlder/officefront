import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, RequestOptionsArgs, Response } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import {Subscription} from "rxjs/Subscription";
@Injectable()
export class PatientService {
    patients: Observable<Response>;
    constructor(private http: Http) {
        console.log("fetching all patients using the patients services...");
        this.patients = this.fetchAllPatients()
    }

    getAllPatients(): Observable<Response> {
        return this.patients;
    }

    public fetchAllPatients() {
        return this.http.get('http://localhost:8080/api/patients/all')
    }
}