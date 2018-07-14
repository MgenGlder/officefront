import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { SpecialistOrder } from '../../../../models/pending-order.model';
import { DBService } from '../../../../services/db.service';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { OrderService } from '../../../../services/order.service';
@Component({
  templateUrl: 'specialist.component.html',
})
export class SpecialistComponent {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
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
    const date = new Date();
    this.order = new SpecialistOrder(
      '',
      '',
      '',
      '',
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
      this.orderService.visitingDoctor,
      this.orderService.referrer);
    orderBuilderService.startBuildingSpecialistOrder();
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
  onSubmit() {
    this.order.type = this.form.get('type').value;
    this.order.notes = this.form.get('notes').value;
    this.order.location = this.form.get('location').value;
    this.order.reason = this.form.get('reason').value;
    this.router.navigate(['orders/new/entered', 'specialist'], { skipLocationChange: true });
    this.save();
  }
  save() {
    this.orderService.addOrder(this.order);
    const date = new Date();
    this.order = new SpecialistOrder(
      '',
      '',
      '',
      '',
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
      this.orderService.visitingDoctor,
      this.orderService.referrer
    );
  }
  resetForm() {
    this.form.reset();
  }
}
