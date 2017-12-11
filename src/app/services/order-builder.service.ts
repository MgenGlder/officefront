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
        this.pendingSpeclialistOrder = new SpecialistOrder("", "", "","", new Date(), this.orderService.visitingDoctor, this.orderService.referrer);
    }
    startBuildingTestOrder() {
        this.pendingTestOrder = new TestOrder([], "", "", "", new Date(), this.orderService.visitingDoctor, this.orderService.referrer);
    }
    startBuildingBloodworkOrder(){
        this.pendingBloodworkOrder = new BloodworkOrder([], this.tests, "", "", "", new Date(), this.orderService.visitingDoctor, this.orderService.referrer);
    }
    save() {

    }
}