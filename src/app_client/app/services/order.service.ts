import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/pending-order.model';
import { DBService } from './db.service';
@Injectable()
export class OrderService {
    public orders: Array<Order> = [];
    public visitingDoctor: string;
    public referrer: string;
    public fetchedOrders: Observable<Object>;
    constructor(private dbService: DBService) {
        this.fetchedOrders = dbService.getAllOrders();
    }
    public getAllOrders(): Observable<Object> {
        return this.fetchedOrders;
    }

    addOrder(order: Order) {
        this.orders.push(order);
    }

    removeOrder(toBeDeleted: Order) {
        // TODO: Might have to use string comparison
        for (let i = 0; i < this.orders.length; i++) {
            if (Object.is(this.orders[i], toBeDeleted)) {
                this.orders.splice(i, 1);
            }
        }
    }

    getOrders(): Order[] {
        return this.orders;
    }
    submitOrder(patientProfile): Promise<any> {
        return this.dbService.saveCompletePatientOrder(this.orders, patientProfile);
    }
}
