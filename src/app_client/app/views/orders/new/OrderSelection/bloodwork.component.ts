import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { BloodworkOrder } from '../../../../models/pending-order.model';
import { DBService } from '../../../../services/db.service';
import { OrderService } from '../../../../services/order.service';
import OrderOptions from '../../../models/OrderOptions';

@Component({
  templateUrl: 'bloodwork.component.html',
})
export class BloodworkComponent {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  order: BloodworkOrder;
  form: FormGroup;
  testsMappingArray: Array<OrderOptions>;
  testObservable: Observable<Object>;

  testAndFormControls = new Array<FormControl>();

  testData: Array<{ id: string, text: string, control: FormControl }>;
  constructor(
    public orderService: OrderService,
    public fb: FormBuilder,
    public router: Router,
    public db: DBService) {
    const date = new Date();
    this.order = new BloodworkOrder(
      [],
      this.testsMappingArray,
      '',
      '',
      '',
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, this.orderService.visitingDoctor, this.orderService.referrer
    );
    this.db.getBloodworkOptions().toPromise().then((data: Array<OrderOptions>) => {
      this.testsMappingArray = data;
      this.testData =
        this.testsMappingArray.map((test) => {
          const newFormControl = new FormControl(false);
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
    });

  }


  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }
  onSubmit() {
    this.order.bloodTests = this.mapFormValues(this.form.get('bloodTests').value);
    this.order.notes = this.form.get('notes').value;
    this.order.reason = this.form.get('reason').value;
    this.router.navigate(['orders/new/entered', 'bloodwork'], { skipLocationChange: true });
    this.save();
  }
  save() {
    this.orderService.addOrder(this.order);
    const date = new Date();
    this.order = new BloodworkOrder(
      [],
      this.testsMappingArray,
      '',
      '',
      '',
      `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`, this.orderService.visitingDoctor, this.orderService.referrer
    );
  }
  resetForm() {
    this.form.reset();
  }

  private mapFormValues(booleanFormValues: Array<boolean>) {
    if (booleanFormValues.length !== this.testsMappingArray.length) { return; }
    return this.testsMappingArray.filter((element, index) => {
      return booleanFormValues[index];
    });
  }
}
