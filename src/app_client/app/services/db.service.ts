import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface OrderRequestObject {
    patientFirstName: String;
    patientLastName: String;
    patientDateOfBirth: String;
    location: String;
    visitingDoctor: String;
    reporter: String;
    dateOfVisit: String;
    notes: String;
    reason: String;
    typeOfOrder: String;
    nursePurpose?: String;
    testID?: String;
    typeOfSpecialist?: String;
}

@Injectable()
export class DBService {
    constructor(private http: HttpClient) {
    }


makePostCall(patientProfile, order) {
    const requestObject: OrderRequestObject = {
        patientFirstName: patientProfile.firstName,
        patientLastName: patientProfile.lastName,
        patientDateOfBirth: patientProfile.dateOfBirth,
        location: order.location,
        visitingDoctor: order.visitingDoctor,
        dateOfVisit: order.dateOfVisit,
        notes: order.notes,
        reason: order.reason,
        typeOfOrder: order.typeOfOrder,
        reporter: order.reporter
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
            requestObject.typeOfSpecialist = order.typeOfSpecialist;
            break;
        default:
            break;
    }
    return this.http.post(environment.mongoDbUrl + '/api/order', requestObject).toPromise();
}
postPatient(newPatient) {
    return this.http.post(environment.mongoDbUrl + '/api/patient/create', newPatient);
}
saveCompletePatientOrder(orders: Array <any>, patientProfile):  Promise<any> {
    const orderPromises = [];
    let order = orders[0];
    for (order of orders) {
        orderPromises.push(this.makePostCall(patientProfile, order));
    }
    return Promise.all(orderPromises);
}
// TODO: Change mongoDbUrl to apiUrl or something like that, it's not just for mongo.
getAllPatients() {
    return this.http.get(environment.mongoDbUrl + '/api/patients/all')
}
getAllOrders() {
    return this.http.get(environment.mongoDbUrl + '/api/orders/all')
}
getBloodworkOptions(): Observable < Response > {
    // TODO: Set up to hit a real endpoint
    return this.http.get<Response>(environment.mongoDbUrl + '/some-endpoint-for-bloodwork');
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
getNurseOptions(): Observable < Response > {
    // TODO: Set up to hit a real endpoint
    return this.http.get<Response>(environment.mongoDbUrl + '/some-endpoint-for-nursing');
    // return [
    //     { value: 'rn-monitor-bp', text: 'Monitor BP' },
    //     { value: 'rn-monitor-bs', text: 'Monitor BS' },
    // ]
}
getTestOptions() {
    return this.http.get(environment.mongoDbUrl + '/api/orderOptions', {
        params: new HttpParams().set('type', 'test')
    });
}
getSpecialistOptions() {
    return this.http.get(environment.mongoDbUrl + '/api/orderOptions', {
        params: new HttpParams().set('type', 'specialist')
    })
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
