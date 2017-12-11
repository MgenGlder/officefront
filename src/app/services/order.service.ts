import { Injectable } from '@angular/core';
import { Order } from '../models/pending-order.model'
@Injectable()
export class OrderService {
    public orders: Array<Order> = [];
    public visitingDoctor;
    public referrer;
    constructor() {}

    addOrder(order: Order) {
        this.orders.push(order);
    }

    removeOrder(toBeDeleted: Order){
        //TODO: Might have to use string comparison
        console.log("removing order...");
        for (let i = 0; i < this.orders.length; i++) {
            if(Object.is(this.orders[i], toBeDeleted)){
                this.orders.splice(i, 1);
                console.log("order removed....");
            }
        }
    }

    getOrders(){
        return this.orders;
    }
    submitOrder(completeOrder) {
        console.log("order was submitted \n ");
        console.dir(completeOrder);
        console.log("current orders are... \n");
        console.dir(this.orders);
    }
}