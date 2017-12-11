import { Component, Input, OnInit } from '@angular/core';
import { Order, SpecialistOrder, BloodworkOrder, TestOrder, NurseOrder } from '../../../../../models/pending-order.model';
import { OrderService } from '../../../../../services/order.service';
@Component({
    selector: 'order-container',
    templateUrl: './order-container.component.html'
})
export class OrderContainerComponent implements OnInit {
    constructor(private OrderService: OrderService) {}
    @Input() order: SpecialistOrder | BloodworkOrder | TestOrder | NurseOrder;
    type: string = "";

    ngOnInit() {
        this.determineTypeOfOrder(this.order);
    }

    isSpecialistOrder(order: SpecialistOrder | BloodworkOrder | TestOrder | NurseOrder): order is SpecialistOrder {
        return (<SpecialistOrder>order).typeOfOrder === "specialist";
    }
    isTestOrder(order: SpecialistOrder | BloodworkOrder | TestOrder | NurseOrder): order is TestOrder {
        return (<TestOrder>order).typeOfOrder === 'test';
    }
    isBloodworkOrder(order: SpecialistOrder | BloodworkOrder | TestOrder | NurseOrder): order is BloodworkOrder {
        return (<BloodworkOrder>order).typeOfOrder === "bloodwork";
    }
    isNurseOrder(order: SpecialistOrder | BloodworkOrder | TestOrder | NurseOrder ): order is NurseOrder {
        return (<NurseOrder>order).typeOfOrder === "nurse"
    }

    deleteOrder(){
        this.OrderService.removeOrder(this.order);
    }

    determineTypeOfOrder(pendingOrder: SpecialistOrder | BloodworkOrder | TestOrder | NurseOrder) {
        if (this.isSpecialistOrder(pendingOrder)) {
            this.type = "specialist"
        } else if (this.isBloodworkOrder(pendingOrder)) {
            this.type = "bloodwork"
        } else if (this.isTestOrder(pendingOrder)) {
            this.type = "test"
        } else if (this.isNurseOrder(pendingOrder)) {
            this.type = "nurse"
        } else {

        }
    }
}