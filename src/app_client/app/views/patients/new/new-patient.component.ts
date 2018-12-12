import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: 'new-patient.component.html'
})
export class NewPatientComponent {
    public patientProfile;
    public patientSubscription
    public constructor(public patientService: PatientService, public router: Router) {
        this.patientProfile = {
            dateOfBirth: '',
            firstName: '',
            lastName: ''
        }
    }

    public createPatient() {
        this.patientSubscription = this.patientService.createPatient(this.patientProfile)
            .pipe(map((data: any) => {
                return data.data;
            }))
            .subscribe((data) => {
                if (data) {
                    this.router.navigateByUrl('/patients/new/successful');
                } else {
                }
            });
    }
}
