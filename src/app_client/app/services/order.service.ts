import { Injectable } from '@angular/core';
import { Order } from '../models/pending-order.model'
import { DBService } from './db.service';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class OrderService {
    public orders: Array<Order> = [];
    public visitingDoctor;
    public referrer;
    public fetchedOrders: Observable<Response>;
    constructor(private db: DBService, private http: Http) {
        console.log("fetching all orders using the order service");
        this.fetchedOrders = this.fetchAllOrders()
    }
    public getAllOrders(): Observable<Response> {
        return this.fetchedOrders;
    }

    private fetchAllOrders() {
        return this.http.get('http://localhost:8080/api/orders/all')
    }


    addOrder(order: Order) {
        this.orders.push(order);
    }

    removeOrder(toBeDeleted: Order) {
        //TODO: Might have to use string comparison
        console.log("removing order...");
        for (let i = 0; i < this.orders.length; i++) {
            if (Object.is(this.orders[i], toBeDeleted)) {
                this.orders.splice(i, 1);
                console.log("order removed....");
            }
        }
    }

    getOrders() {
        return this.orders;
    }
    submitOrder(patientProfile): Promise<any> {
        return this.db.saveCompletePatientOrder(this.orders, patientProfile);
    }
}