import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { NurseOrder } from '../../../../models/pending-order.model';
import { DBService } from '../../../../services/db.service';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { OrderService } from '../../../../services/order.service';
@Component({
  templateUrl: 'nurse.component.html',
})
export class NurseComponent {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  form: FormGroup;
  selectedInputs: Array<{ value: string, text: string, control: FormControl }>;
  order: NurseOrder;

  tests;

  testAndFormControls = new Array<FormControl>();

  testData: Array<{ id: string, text: string, control: FormControl }>;
  constructor(
    public orderService: OrderService,
    public orderBuilderService: OrderBuilderService,
    public fb: FormBuilder,
    public router: Router,
    public db: DBService) {
    const date = new Date();
    this.order = new NurseOrder(
      [],
      '',
      '',
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
      this.orderService.visitingDoctor,
      this.orderService.referrer);
    this.tests = db.getNurseOptions();
    orderBuilderService.startBuildingTestOrder();
    this.testData =
      this.tests.map((test) => {
        const newFormControl = new FormControl(false);
        this.testAndFormControls.push(newFormControl);
        return {
          id: test.value,
          text: test.text,
          control: newFormControl
        }
      });
    this.form = fb.group({
      nursePurpose: new FormArray(this.testAndFormControls),
      reason: '',
      notes: '',
    });
  }


  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  onSubmit() {
    this.order.nursePurpose = this.mapFormValues(this.form.get('nursePurpose').value);
    this.order.notes = this.form.get('notes').value;
    this.order.reason = this.form.get('reason').value;
    this.router.navigate(['orders/new/entered', 'nurse'], { skipLocationChange: true });
    this.save();
  }
  save() {
    console.log('Saving the order...');
    this.orderService.addOrder(this.order);
    console.log(this.orderService.getOrders());
    const date = new Date();
    this.order = new NurseOrder(
      [],
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

  mapFormValues(booleanFormValues: Array<boolean>): Array<{ value: string, text: string }> {
    if (booleanFormValues.length !== this.tests.length) { return; }
    return this.tests.filter((element, index) => {
      return booleanFormValues[index];
    });
  }
}

// return query ? value.reduce((prev, next) => {
//   if (next[field].includes(query)) { prev.push(next); }
//   return prev;
// }, []) : value;
