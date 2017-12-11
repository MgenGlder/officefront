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
  order: TestOrder;
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
      this.form = fb.group({
        tests: new FormArray(this.testAndFormControls),
        reason: '',
        notes: '',
        extraInfo: new FormArray([])
      });
      this.order = new TestOrder([], "", "", "", new Date(), this.orderService.visitingDoctor, this.orderService.referrer);
      this.tests = this.db.getTestOptions();
      orderBuilderService.startBuildingTestOrder();
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
    }




  @ViewChild('staticTabs') staticTabs: TabsetComponent;


  loadInputsForExtraInfo(): void {

    let arrayMappedTests: Array<{ value: string, text: string, location: boolean }> = [];
    let formArrayTestsNeedingInfo: Array<FormControl> = [];
    let arrayMappedTestsNeedingInfoWithControls: Array<{ value: string, text: string, control: FormControl }>;
    arrayMappedTests = this.mapFormValues(this.form.get("tests").value);

    arrayMappedTestsNeedingInfoWithControls = arrayMappedTests
      .filter((input) => {
        return input.location;
      })
      .map((input) => {
        let newControl = new FormControl('');
        formArrayTestsNeedingInfo.push(newControl);
        return {
          value: input.value,
          text: input.text,
          control: newControl
        };
      })

    this.form.controls["extraInfo"] = new FormArray(formArrayTestsNeedingInfo)
    this.selectedInputs = arrayMappedTestsNeedingInfoWithControls;
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  onSubmit() {
    this.order.notes = this.form.get("notes").value;
    this.order.tests = this.mapFormValues(this.form.get("tests").value);
    this.order.reason = this.form.get("reason").value;
    this.router.navigate(['orders/new/entered', 'test'], { skipLocationChange: true });
    this.save();
  }
  save() {
    console.log("Saving the order...");
    this.orderService.addOrder(this.order);
    console.log(this.orderService.getOrders());
    this.order = new TestOrder([], "", "", "", new Date(),this.orderService.visitingDoctor, this.orderService.referrer);
  }
  resetForm() {
    this.form.reset();
  }

  mapFormValues(booleanFormValues: Array<boolean>): Array<{ value: string, text: string, location: boolean }> {
    if (booleanFormValues.length !== this.tests.length) return;
    return this.tests.filter((element, index) => {
      return booleanFormValues[index];
    });
  }
}

// return query ? value.reduce((prev, next) => {
//   if (next[field].includes(query)) { prev.push(next); }
//   return prev;
// }, []) : value;