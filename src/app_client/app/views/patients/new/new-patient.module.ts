import { NgModule } from '@angular/core';
import { NewPatientRoutingModule } from './new-patient-router';
import { NewPatientComponent } from './new-patient.component';
import { FormsModule } from '@angular/forms';
import { SuccessfulNewPatientComponent } from './successful-new-patient.component';

@NgModule({
    imports: [
        NewPatientRoutingModule,
        FormsModule
    ],
    declarations: [
        NewPatientComponent,
        SuccessfulNewPatientComponent
    ],
    providers: []
})
export class NewPatientModule {

}
