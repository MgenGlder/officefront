import { NgModule } from '@angular/core';
import { PatientsRoutingModule } from './patient-router.module';
import { PatientService } from '../../services/patient.service';
@NgModule({
    imports: [
        PatientsRoutingModule
    ],
    declarations: [
    ],
    providers: [PatientService]
})
export class PatientsModule {

}
