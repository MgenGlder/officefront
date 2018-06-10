import { Component } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

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
        console.log('creating the patient');
        this.patientSubscription = this.patientService.createPatient(this.patientProfile)
            .map((data) => data.json())
            .subscribe((data) => {
                console.log('Data was recieved');
                if (data) {
                    this.router.navigateByUrl('/patients/new/successful')
                } else {
                    console.log('data didn\'t work as planned');
                }
            });
    }
}
