import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DBService } from './../../../services/db.service';
import { PatientService } from './../../../services/patient.service';
import { NewPatientComponent } from './new-patient.component';
import { SuccessfulNewPatientComponent } from './successful-new-patient.component';
describe('NewPatientComponent', () => {
    let newPatientComponent: NewPatientComponent;
    let fixture: ComponentFixture<NewPatientComponent>;
    let patientService: PatientService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'patients/new/successful', component: SuccessfulNewPatientComponent }
                ]),
                FormsModule,
                HttpClientTestingModule
            ],
            providers: [
               PatientService,
               DBService
            ],
            declarations: [
                NewPatientComponent,
                SuccessfulNewPatientComponent
            ]
        })
            .compileComponents();
        patientService = TestBed.get(PatientService);
        fixture = TestBed.createComponent(NewPatientComponent);
        newPatientComponent = fixture.componentInstance;
    });
    it('should make call to patient service to create patient', () => {
        spyOn(patientService, 'createPatient').and.callThrough();
        newPatientComponent.createPatient();
        expect(newPatientComponent.patientService.createPatient).toHaveBeenCalled();
    });
    afterEach(() => {
        const element = fixture.debugElement.nativeElement;
        element.remove();
    });
});
