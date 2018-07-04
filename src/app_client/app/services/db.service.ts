import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Order } from '../models/pending-order.model';
import { Observable } from 'rxjs';
import { request } from 'https';

@Injectable()
export class DBService {
    constructor(private http: Http) {
    }

    makePostCall(patientProfile, order) {
        const requestObject: {
            patientFirstName: String,
            patientLastName: String,
            patientDateOfBirth: String,
            location: String,
            visitingDoctor: String,
            dateOfVisit: String,
            notes: String,
            reason: String,
            type: String,
            nursePurpose?: String,
            testID?: String
        } = {
            patientFirstName: patientProfile.firstName,
            patientLastName: patientProfile.lastName,
            patientDateOfBirth: patientProfile.dateOfBirth,
            location: order.location,
            visitingDoctor: order.reporter,
            dateOfVisit: order.dateOfVisit,
            notes: order.notes,
            reason: order.reason,
            type: order.typeOfOrder,
        }
        switch (order.typeOfOrder) {
            case 'nurse':
                requestObject.nursePurpose = order.nursePurpose;
                break;
            case 'test':
                requestObject.testID = order.testID;
                break;
            case 'bloodwork':
                requestObject.testID = order.testID;
                break;
            case 'specialist':
                break;
            default:
                break;
        }
        this.http.post('http://localhost:8080/api/order', requestObject).toPromise()
    }
    saveCompletePatientOrder(orders: Array<any>, patientProfile): Promise<any> {
        const orderPromises = [];
        let order = orders[0];
        for (order of orders) {
           this.makePostCall(patientProfile, order);
        }
        console.log('order saved');
        return Promise.all(orderPromises);
    }

    getBloodworkOptions(): Observable<Response> {
        // TODO: Set up to hit a real endpoint
        return this.http.get('localhost:8080/some-endpoint-for-bloodwork');
        // return [
        //     { value: 'hgb-aic-level', text: 'Hgb. AIC Level' },
        //     { value: 'bun-creat', text: 'BUN, CREAT' },
        //     { value: 'cholesterol', text: 'Cholesterol/PSA' },
        //     { value: 'lipid-profile', text: 'Lipid Profile' },
        //     { value: 'cbc-with-diff', text: 'CBC With Diff' },
        //     { value: 'comp-tsh-lft', text: 'COMP TSH LFT' },
        //     { value: 'metabolic-panel', text: 'Metabolic Panel' }
        // ];
    }
    getNurseOptions(): Observable<Response> {
        return this.http.get('localhost:8080/some-endpoint-for-nursing');
        // return [
        //     { value: 'rn-monitor-bp', text: 'Monitor BP' },
        //     { value: 'rn-monitor-bs', text: 'Monitor BS' },
        // ]
    }
    getTestOptions() {
        return this.http.get('localhost:8080/some-endpoint-for-tests');
        // return [
        //     { value: 'x-ray', text: 'X-Ray', location: true },
        //     { value: 'ekg', text: 'EKG', location: true },
        //     { value: 'pft', text: 'PFT', location: false },
        //     { value: 'eye-exam', text: 'Eye Exam', location: false },
        //     { value: 'doppler', text: 'Doppler (Pedal Or Carotid)', location: true },
        //     { value: 'ultrasound', text: 'Ultrasound', location: true },
        //     { value: 'urology', text: 'Urology/Urinalysis', location: false }
        // ];
    }
    getSpecialistOptions() {
        return this.http.get('localhost:8080/some-endpoint-for-specialists')
        // return [
        //     { value: 'podiatrist', text: 'Podiatrist' },
        //     { value: 'optometrist', text: 'Optometrist' },
        //     { value: 'cardiologist', text: 'Cardiologist' },
        //     { value: 'neurologist', text: 'Neurologist' },
        //     { value: 'dermatologist', text: 'Dermatologist' },
        //     { value: 'pain-doctor', text: 'Pain Doctor' },
        //     { value: 'psychiatrist', text: 'Psychiatrist' },
        //     { value: 'ent', text: 'ENT' },
        //     { value: 'physical-therapy', text: 'Physical Therapy' }
        // ]
    }
    /*  getPatientList() {
         return [
             { firstName: "Joe", lastName: "Budden", dob: "09/11/1976" },
             { firstName: "DJ", lastName: "Akademiks", dob: "03/12/1955" },
             { firstName: "Nadeska", lastName: "Alexis", dob: "06/25/1963" },
             { firstName: "Kunle", lastName: "Oshiyoye", dob: "07/30/1993" },
             { firstName: "Justice", lastName: "Oshiyoye", dob: "01/27/1995" },
             { firstName: "Brittany", lastName: "Oshiyoye", dob: "08/15/2002" },
             { firstName: "Adekunle", lastName: "Oshiyoye", dob: "01/05/1951" },
             { firstName: "Harold", lastName: "Pegues", dob: "06/20/1974" }
         ]
     }
     Depreciated, was used for testing purposes.*/
}
