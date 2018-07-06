import { PatientService } from './patient.service';
import { Http, BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { DBService } from './db.service';
import { of } from 'rxjs';

describe('PatientService', () => {
    let patientService: PatientService;
    let dbService: DBService;
    let httpPost: jasmine.Spy;
    beforeEach(() => {
        const http = new Http(new MockBackend(), new BaseRequestOptions());
        httpPost = spyOn(http, 'post');
        dbService = new DBService(http);
        spyOn(dbService, 'getAllPatients').and.returnValue(
            of(new Response(new ResponseOptions({
                body: {
                    firstName: 'Kunle',
                    lastName: 'Oshiyoye',
                    dateOfBirth: '07/30/1993'
                }
            }))
            )
        )
        patientService = new PatientService(http, dbService);
    })
    it('should fetch all patients', () => {
        const patients = patientService.fetchAllPatients();
        patients.subscribe((patient) => {
            expect(patient.json()).toEqual({
                firstName: 'Kunle',
                lastName: 'Oshiyoye',
                dateOfBirth: '07/30/1993'
            })
        });
    });
    it('should get all patients after they\'ve been fetched', () => {
        const patients = patientService.getAllPatients();
        expect(patients).toBeDefined();
    });
    it('should create patients', () => {
        patientService.createPatient({
            firstName: 'Kunle',
            lastName: 'Oshiyoye',
            dateOfBirth: '07/30/1993'
        });
        expect(httpPost).toHaveBeenCalled();
    });
});
