import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DBService } from './db.service';
@Injectable()
export class PatientService {
    // Remember, using the dollar in the variable name of an observable is considered to be best practice
    patients: Observable<Response | Object>;
    constructor(private dbService: DBService) {
        this.patients = this.fetchAllPatients();
    }

    public getAllPatients(): Observable<Object> {
        return this.patients;
    }

    public fetchAllPatients() {
        return this.dbService.getAllPatients();
    }

    public createPatient(newPatient): Observable<Object> {
        return this.dbService.postPatient(newPatient);
    }
}
