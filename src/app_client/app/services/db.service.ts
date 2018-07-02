import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Order } from '../models/pending-order.model';

@Injectable()
export class DBService {
    constructor(private http: Http) {
    }
    saveCompletePatientOrder(orders: Array<any>, patientProfile): Promise<any> {
        const  orderPromises = [];
        let order = orders[0];
        for (order of orders) {
            if (order.typeOfOrder === 'nurse') {
                this.http.post('http://localhost:8080/api/order', {
                    patientFirstName: patientProfile.firstName,
                    patientLastName: patientProfile.lastName,
                    patientDateOfBirth: patientProfile.dateOfBirth,
                    nursePurpose: order.nursePurpose,
                    type: order.typeOfOrder,
                    reason: order.reason,
                    notes: order.notes,
                    dateOfVisit: order.dateOfVisit,
                    visitingDoctor: order.reporter,
                    reporter: order.visitingDoctor,
                    location: order.location
                }).toPromise()
            } else if (order.typeOfOrder === 'test') {
                orderPromises.push(
                    this.http.post('http://localhost:8080/api/order', {
                        patientFirstName: patientProfile.firstName,
                        patientLastName: patientProfile.lastName,
                        patientDateOfBirth: patientProfile.dateOfBirth,
                        type: order.type,
                        testID: order.testID,
                        reason: order.reason,
                        notes: order.notes,
                        dateOfVisit: order.dateOfVisit,
                        visitingDoctor: order.visitingDoctor,
                        reporter: order.reporter,
                        location: order.location
                    }).toPromise()
                )
            } else if (order.typeOfOrder === 'bloodwork') {
                orderPromises.push(
                    this.http.post('http://localhost:8080/api/order', {
                        patientFirstName: patientProfile.firstName,
                        patientLastName: patientProfile.lastName,
                        patientDateOfBirth: patientProfile.dateOfBirth,
                        type: order.typeOfOrder,
                        testID: order.testID,
                        reason: order.reason,
                        notes: order.notes,
                        dateOfVisit: order.dateOfVisit,
                        visitingDoctor: order.visitingDoctor,
                        report: order.reporter,
                        location: order.location
                    }).toPromise()
                ) // specialist orders
            } else {
                orderPromises.push(
                    this.http.post('http://localhost:8080/api/order', {
                        patientFirstName: patientProfile.firstName,
                        patientLastName: patientProfile.lastName,
                        patientDateOfBirth: patientProfile.dateOfBirth,
                        type: order.type,
                        reason: order.reason,
                        notes: order.notes,
                        dateOfVisit: order.dateOfVisit,
                        visitingDoctor: order.reporter,
                        reporter: order.reporter,
                        location: order.location
                    }).toPromise()
                )
            }
        }
        console.log('order saved');
        return Promise.all(orderPromises);
    }
    saveCompletePatientTestOrder(orders, patientProfile) {
        // TODO: Separate the different types of orders into their own functions.
    }

    getBloodworkOptions() {
        return [
            { value: 'hgb-aic-level', text: 'Hgb. AIC Level' },
            { value: 'bun-creat', text: 'BUN, CREAT' },
            { value: 'cholesterol', text: 'Cholesterol/PSA' },
            { value: 'lipid-profile', text: 'Lipid Profile' },
            { value: 'cbc-with-diff', text: 'CBC With Diff' },
            { value: 'comp-tsh-lft', text: 'COMP TSH LFT' },
            { value: 'metabolic-panel', text: 'Metabolic Panel' }
        ];
    }
    getNurseOptions() {
        return [
            { value: 'rn-monitor-bp', text: 'Monitor BP' },
            { value: 'rn-monitor-bs', text: 'Monitor BS' },
        ]
    }
    getTestOptions() {
        return [
            { value: 'x-ray', text: 'X-Ray', location: true },
            { value: 'ekg', text: 'EKG', location: true },
            { value: 'pft', text: 'PFT', location: false },
            { value: 'eye-exam', text: 'Eye Exam', location: false },
            { value: 'doppler', text: 'Doppler (Pedal Or Carotid)', location: true },
            { value: 'ultrasound', text: 'Ultrasound', location: true },
            { value: 'urology', text: 'Urology/Urinalysis', location: false }
        ];
    }
    getSpecialistOptions() {
        return [
            { value: 'podiatrist', text: 'Podiatrist' },
            { value: 'optometrist', text: 'Optometrist' },
            { value: 'cardiologist', text: 'Cardiologist' },
            { value: 'neurologist', text: 'Neurologist' },
            { value: 'dermatologist', text: 'Dermatologist' },
            { value: 'pain-doctor', text: 'Pain Doctor' },
            { value: 'psychiatrist', text: 'Psychiatrist' },
            { value: 'ent', text: 'ENT' },
            { value: 'physical-therapy', text: 'Physical Therapy' }
        ]
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
