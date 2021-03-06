import { Injectable } from '@angular/core';
import { TestOrder, BloodworkOrder, SpecialistOrder, FullDoctorsOrder, Order } from '../models/pending-order.model';
import { OrderService } from '../services/order.service';
import OrderOptions from '../views/models/OrderOptions';
@Injectable()
export class OrderBuilderService {
    pendingSpecialistOrder: SpecialistOrder;
    pendingTestOrder: TestOrder;
    pendingBloodworkOrder: BloodworkOrder;
    tests: Array<OrderOptions> = [
        { value: 'hgb-aic-level', text: 'Hgb. AIC Level' },
        { value: 'bun-creat', text: 'BUN, CREAT' },
        { value: 'cholesterol', text: 'Cholesterol/PSA' },
        { value: 'lipid-profile', text: 'Lipid Profile' },
        { value: 'cbc-with-diff', text: 'CBC With Diff' },
        { value: 'comp-tsh-lft', text: 'COMP TSH LFT' },
        { value: 'metabolic-panel', text: 'Metabolic Panel' }
    ]
    constructor(private orderService: OrderService) { }

    startBuildingSpecialistOrder() {
        const date = new Date();
        this.pendingSpecialistOrder = new SpecialistOrder(
            '',
            '',
            '',
            '',
            `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
            this.orderService.visitingDoctor,
            this.orderService.referrer
        );
    }
    startBuildingTestOrder() {
        const date = new Date();
        this.pendingTestOrder = new TestOrder(
            '',
            '',
            '',
            '',
            `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
            this.orderService.visitingDoctor,
            this.orderService.referrer
        );
    }
    startBuildingBloodworkOrder() {
        const date = new Date();
        this.pendingBloodworkOrder = new BloodworkOrder(
            [],
            this.tests,
            '',
            '',
            '',
            `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
            this.orderService.visitingDoctor,
            this.orderService.referrer
        );
    }
}
