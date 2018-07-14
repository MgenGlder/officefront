import { ViewChild, Component, Output, EventEmitter } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { TestOrder } from '../../../../models/pending-order.model';
import { OrderService } from '../../../../services/order.service';
import { OrderBuilderService } from '../../../../services/order-builder.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DBService } from '../../../../services/db.service';
@Component({
  templateUrl: 'test.component.html',
})
export class TestComponent {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  order: TestOrder;
  orders: Array<any> = [];
  form: FormGroup;
  selectedInputs: Array<{ value: string, text: string, control: FormControl }>;
  testData: Array<{ id: string, text: string, control: FormControl }>;
  tests;

  testAndFormControls = new Array<FormControl>();
  constructor(
    public orderService: OrderService,
    public orderBuilderService: OrderBuilderService,
    public fb: FormBuilder,
    public router: Router,
    public db: DBService) {
    const date = new Date();
    this.order = new TestOrder(
      '',
      '',
      '',
      '',
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
      this.orderService.visitingDoctor,
      this.orderService.referrer);
    this.tests = this.db.getTestOptions();
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
      tests: new FormArray(this.testAndFormControls),
      reason: '',
      notes: '',
      extraInfo: new FormArray([])
    });
  }



  loadInputsForExtraInfo(): void {

    let arrayMappedTests: Array<{ value: string, text: string, location: boolean }> = [];
    const formArrayTestsNeedingInfo: Array<FormControl> = [];
    let arrayMappedTestsNeedingInfoWithControls: Array<{ value: string, text: string, control: FormControl }>;
    arrayMappedTests = this.mapFormValues(this.form.get('tests').value);
    arrayMappedTestsNeedingInfoWithControls = arrayMappedTests
      .filter((input) => {
        return input.location;
      })
      .map((input) => {
        const newControl = new FormControl('');
        formArrayTestsNeedingInfo.push(newControl);
        return {
          value: input.value,
          text: input.text,
          control: newControl
        };
      })

    this.form.controls['extraInfo'] = new FormArray(formArrayTestsNeedingInfo)
    this.selectedInputs = arrayMappedTestsNeedingInfoWithControls;
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  onSubmit() {
    this.order.notes = this.form.get('notes').value;
    const testValues = this.mapFormValues(this.form.get('tests').value);
    for (const value of testValues) {
      const date = new Date();
      const newTestOrder = new TestOrder(
        value.value,
        this.form.get('reason').value,
        '',
        this.form.get('notes').value,
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
        this.orderService.visitingDoctor,
        this.orderService.referrer
      )
      if (value.location) {
        for (const selectedValue of this.selectedInputs) {
          if (selectedValue.value === value.value) {
            newTestOrder.location = selectedValue.control.value;
          }
        }
      }
      this.orders.push(newTestOrder);
    }
    this.router.navigate(['orders/new/entered', 'test'], { skipLocationChange: true });
    this.save();
    this.resetForm();
  }
  save() {
    for (const singleOrder of this.orders) {
      this.orderService.addOrder(singleOrder);
    }
    this.orders = [];
  }
  resetForm() {
    this.form.reset();
  }

  mapFormValues(booleanFormValues: Array<boolean>): Array<{
    value: string,
    text: string,
    location: boolean,
    locationNotes?: string,
    reason?: string,
    notes?: string
  }> {
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
