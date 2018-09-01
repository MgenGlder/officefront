import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import OrderOptions from '../views/models/OrderOptions';

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
    statuses?: Array<String>;
}

@Injectable()
export class DBService {
    constructor(private http: HttpClient) {
    }

    getOrder(orderId: string) {
        return this.http.get(environment.apiUrl + '/api/order', {
            params: new HttpParams().set('uniqueID', orderId)
        });
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
            reporter: order.reporter,
            statuses: order.statuses
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
        return this.http.post(environment.apiUrl + '/api/order', requestObject).toPromise();
    }
    postPatient(newPatient) {
        return this.http.post(environment.apiUrl + '/api/patient/create', newPatient);
    }
    saveCompletePatientOrder(orders: Array<any>, patientProfile): Promise<any> {
        const orderPromises = [];
        for (const order of orders) {
            orderPromises.push(this.makePostCall(patientProfile, order));
        }
        return Promise.all(orderPromises);
    }
    getAllPatients() {
        return this.http.get(environment.apiUrl + '/api/patients/all')
    }
    getAllOrders() {
        return this.http.get(environment.apiUrl + '/api/orders/all')
    }
    getBloodworkOptions(): Observable<Array<OrderOptions>> {
        return this.http.get<Array<OrderOptions>>(environment.apiUrl + '/api/orderOptions', {
            params: new HttpParams().set('type', 'bloodwork')
        });
    }
    getNurseOptions(): Observable<Array<OrderOptions>> {
        return this.http.get<Array<OrderOptions>>(environment.apiUrl + '/api/orderOptions', {
            params: new HttpParams().set('type', 'nurse')
        });
    }
    getTestOptions(): Observable<Array<OrderOptions>> {
        return this.http.get<Array<OrderOptions>>(environment.apiUrl + '/api/orderOptions', {
            params: new HttpParams().set('type', 'test')
        });
    }
    getSpecialistOptions(): Observable<Array<OrderOptions>> {
        return this.http.get<Array<OrderOptions>>(environment.apiUrl + '/api/orderOptions', {
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
