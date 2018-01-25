import { ViewChild, Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { SpecialistOrder } from '../../../../models/pending-order.model';
import { OrderService } from '../../../../services/order.service';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBService } from '../../../../services/db.service';
@Component({
  templateUrl: 'specialist.component.html',
})
export class SpecialistComponent {
  order: SpecialistOrder;
  form: FormGroup;
  specialistData;
  constructor(
    public orderService: OrderService,
    public orderBuilderService: OrderBuilderService,
    public fb: FormBuilder,
    public router: Router, public db: DBService) {
    this.form = fb.group({
      type: '',
      notes: '',
      location: '',
      reason: ''
    });
    this.specialistData = this.db.getSpecialistOptions();
    let date = new Date();
    this.order = new SpecialistOrder("", "", "", "", `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, this.orderService.visitingDoctor, this.orderService.referrer);
    orderBuilderService.startBuildingSpecialistOrder();
  }

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
  onSubmit() {
    this.order.type = this.form.get("type").value;
    this.order.notes = this.form.get("notes").value;
    this.order.location = this.form.get("location").value;
    this.order.reason = this.form.get("reason").value;
    this.router.navigate(['orders/new/entered', 'specialist'], { skipLocationChange: true });
    this.save();
  }
  save() {
    console.log("Saving the order...");
    this.orderService.addOrder(this.order);
    console.log(this.orderService.getOrders());
    let date = new Date();
    this.order = new SpecialistOrder("", "", "", "", `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, this.orderService.visitingDoctor, this.orderService.referrer);
  }
  resetForm() {
    this.form.reset();
  }
}