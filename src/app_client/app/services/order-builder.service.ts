import { Injectable } from '@angular/core';
import { TestOrder, BloodworkOrder, SpecialistOrder, FullDoctorsOrder, Order } from '../models/pending-order.model';
import { OrderService } from '../services/order.service';
@Injectable()
export class OrderBuilderService {
    pendingSpeclialistOrder: SpecialistOrder;
    pendingTestOrder: TestOrder;
    pendingBloodworkOrder: BloodworkOrder;
    tests: Array<{ value: string, text: string }> = [
        { value: "hgb-aic-level", text: "Hgb. AIC Level" },
        { value: "bun-creat", text: "BUN, CREAT" },
        { value: "cholesterol", text: "Cholesterol/PSA" },
        { value: "lipid-profile", text: "Lipid Profile" },
        { value: "cbc-with-diff", text: "CBC With Diff" },
        { value: "comp-tsh-lft", text: "COMP TSH LFT" },
        { value: "metabolic-panel", text: "Metabolic Panel" }
      ]
    constructor(private orderService: OrderService) {}

    startBuildingSpecialistOrder() {
        let date = new Date();
        this.pendingSpeclialistOrder = new SpecialistOrder("", "", "","", `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, this.orderService.visitingDoctor, this.orderService.referrer);
    }
    startBuildingTestOrder() {
        let date = new Date();
        this.pendingTestOrder = new TestOrder( "","", "", "", `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, this.orderService.visitingDoctor, this.orderService.referrer);
    }
    startBuildingBloodworkOrder(){
        let date = new Date();
        this.pendingBloodworkOrder = new BloodworkOrder([], this.tests, "", "", "", `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, this.orderService.visitingDoctor, this.orderService.referrer);
    }
    save() {

    }
}
