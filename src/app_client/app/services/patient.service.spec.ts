import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { DBService } from './db.service';
import { PatientService } from './patient.service';

describe('PatientService', () => {
    let patientService: PatientService;
    let injector;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            declarations: [
            ],
            providers: [
                PatientService,
                DBService
            ]
        })
        injector = getTestBed();
        patientService = injector.get(PatientService);

    })
    it('should fetch all patients', async(inject([HttpClient, HttpTestingController],
        (httpClient: HttpClient, backend: HttpTestingController) => {
            patientService.fetchAllPatients().subscribe((data) => {
                expect(data).toEqual({
                    firstName: 'Kunle',
                    lastName: 'Oshiyoye',
                    dateOfBirth: '07/30/1993'
                })
            });
            const req = backend.expectOne({
                method: 'GET'
            });
            expect(req.request.url.endsWith('/api/patients/all')).toBeTruthy();
            req.flush(
                {
                    firstName: 'Kunle',
                    lastName: 'Oshiyoye',
                    dateOfBirth: '07/30/1993'
                }
            )
        })
    ));
    it('should get all patients after they\'ve been fetched', async(inject([HttpClient, HttpTestingController],
        (httpClient: HttpClient, backend: HttpTestingController) => {
            patientService.getAllPatients().subscribe();

            const req = backend.expectOne({
                method: 'GET'
            });
            expect(req.request.url.endsWith('/api/patients/all')).toBeTruthy();
        }))
    );
    it('should create patients', async(
        inject([HttpClient, HttpTestingController], (httpClient: HttpClient, backend: HttpTestingController) => {
            patientService.createPatient({
                firstName: 'Kunle',
                lastName: 'Oshiyoye',
                dateOfBirth: '07/30/1993'
            }).subscribe();
            const req = backend.expectOne({
                method: 'POST'
            })
            expect(req.request.url.endsWith('/api/patient/create')).toBeTruthy();
        })
    ))
});
