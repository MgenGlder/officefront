import { ViewChild, Component, Output, EventEmitter } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { BloodworkOrder } from '../../../../models/pending-order.model';
import { OrderService } from '../../../../services/order.service';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DBService } from '../../../../services/db.service';
@Component({
  templateUrl: 'bloodwork.component.html',
})
export class BloodworkComponent {
  order: BloodworkOrder;
  form: FormGroup;
  tests;

  testAndFormControls = new Array<FormControl>();

  testData: Array<{ id: string, text: string, control: FormControl }>;
  constructor(
    public orderService: OrderService,
    public orderBuilderService: OrderBuilderService,
    public fb: FormBuilder,
    public router: Router,
    public db: DBService) {
    this.order = new BloodworkOrder([], this.tests, "", "", "", new Date(), this.orderService.visitingDoctor, this.orderService.referrer);
    this.tests = this.db.getBloodworkOptions();
    orderBuilderService.startBuildingSpecialistOrder();
    this.testData =
    this.tests.map((test) => {
      let newFormControl = new FormControl(false);
      this.testAndFormControls.push(newFormControl);
      return {
        id: test.value,
        text: test.text,
        control: newFormControl
      }
    });
    this.form = fb.group({
      bloodTests: new FormArray(this.testAndFormControls),
      notes: '',
      reason: ''
    });
  }

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
  onSubmit() {
    this.order.bloodTests = this.mapFormValues(this.form.get("bloodTests").value);
    this.order.notes = this.form.get("notes").value;
    this.order.reason = this.form.get("reason").value;
    console.log(this.form.get("bloodTests").value);
    this.router.navigate(['orders/new/entered', 'bloodwork'], { skipLocationChange: true });
    this.save();
  }
  save() {
    console.log("Saving the order...");
    this.orderService.addOrder(this.order);
    console.log(this.orderService.getOrders());
    this.order = new BloodworkOrder([], this.tests, "", "", "", new Date(), this.orderService.visitingDoctor, this.orderService.referrer);
  }
  resetForm() {
    this.form.reset();
  }

  mapFormValues(booleanFormValues: Array<boolean>) {
      if (booleanFormValues.length !== this.tests.length) return;
      return this.tests.filter((element, index) => {
          return booleanFormValues[index];      
      });
  }
}