import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../../../models/pending-order.model';
import { OrderService } from '../../../../../services/order.service';
@Component({
    // tslint:disable-next-line
    selector: 'order-container',
    templateUrl: './order-container.component.html'
})
export class OrderContainerComponent implements OnInit {
    @Input() order: Order;
    type = '';
    constructor(private orderService: OrderService) {}

    ngOnInit() {
        this.determineTypeOfOrder(this.order);
    }

    deleteOrder() {
        this.orderService.removeOrder(this.order);
    }

    determineTypeOfOrder(pendingOrder: Order) {
        this.type = pendingOrder.typeOfOrder;
    }
}
