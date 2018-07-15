import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PatientService } from '../../../services/patient.service';
import { NewPatientComponent } from './new-patient.component';
import { SuccessfulNewPatientComponent } from './successful-new-patient.component';

class MockPatientService {
    createPatient() {
        return of(
            new Response(
                new ResponseOptions({
                    body: {
                        data: 'someData'
                    }
                })
            )
        )
    }
}
class MockRouter {
    navigateToUrl(url: string) {
        return url;
    }
}
describe('NewPatientComponent', () => {
    const mockPatientService = new MockPatientService();
    let newPatientComponent: NewPatientComponent;
    let fixture: ComponentFixture<NewPatientComponent>;
    beforeEach(() => {
        spyOn(mockPatientService, 'createPatient').and.callThrough();
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'patients/new/successful', component: SuccessfulNewPatientComponent }
                ]),
                FormsModule
            ],
            providers: [
                { provide: PatientService, useValue: mockPatientService },
            ],
            declarations: [
                NewPatientComponent,
                SuccessfulNewPatientComponent
            ]
        })
            .compileComponents();
        fixture = TestBed.createComponent(NewPatientComponent);
        newPatientComponent = fixture.componentInstance;
    });
    it('should make call to patient service to create patient', () => {
        newPatientComponent.createPatient();
        expect(newPatientComponent.patientService.createPatient).toHaveBeenCalled();
    });
});
