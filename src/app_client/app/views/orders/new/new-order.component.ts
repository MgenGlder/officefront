import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Response } from '@angular/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Order } from '../../../models/pending-order.model';
import { DBService } from '../../../services/db.service';
import { OrderBuilderService } from '../../../services/order-builder.service';
import { OrderService } from '../../../services/order.service';
import { PatientService } from '../../../services/patient.service';
@Component({
  templateUrl: 'new-order.component.html',
  styles: [`.btn.btn-primary { display: inline-block;width: 150px;margin-bottom: 0px;margin-bottom: 10px; margin-left: 5px;}
  #doctors-orders { display: flex; flex-direction: row; justify-content: center } `],
  encapsulation: ViewEncapsulation.Emulated
})
export class NewOrderComponent implements OnInit, OnDestroy {
  // ng2-select
  public items: Array<string> = ['This', 'can', 'be', 'any', 'set', 'of', 'items'];
  private value: any = ['This'];
  // Timepicker
  public hstep = 1;
  public mstep = 15;
  public isMeridian = true;
  public isEnabled = true;
  public myTime: Date = new Date();
  public options: any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };
  public examplePatients;
  // Angular 2 Input Mask
  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public orders: Array<Order>;
  public patientProfile;
  public patientsObservable: Observable<Response>;
  public patientsSubscription: Subscription;
  public patientData;
  public sanitizer;
  public constructor(public orderBuilderService: OrderBuilderService,
    public _sanitizer: DomSanitizer,
    public orderService: OrderService,
    private patientService: PatientService,
    public router: Router,
    private db: DBService) {
    this.sanitizer = _sanitizer;
    this.orderService.visitingDoctor = 'Dr. Hampson';
    this.orderService.referrer = 'Dr. Hampson';
    this.patientProfile = {
      dateOfBirth: '',
      firstName: '',
      lastName: ''
    }
    this.patientsSubscription = patientService.getAllPatients()
      .subscribe((patientData) => {
        this.patientData = patientData;
      })
  }

  submitOrder() {
    this.orderService.submitOrder(this.patientProfile)
      .then((response) => {
        this.router.navigateByUrl('/orders/new/submitted');
      })
      .catch((err) => {
        this.router.navigateByUrl('/orders/new/notsubmitted');
      })
  }
  ngOnInit() {
    this.orders = this.orderService.getOrders();
  }

  ngOnDestroy() {
    this.patientsSubscription.unsubscribe();
  }

  firstNameAutoCompleted(data: any) {
    this.patientProfile.lastName = data.lastName;
    this.patientProfile.dateOfBirth = data.dateOfBirth;
    this.patientProfile.firstName = data.firstName;
  }
  autocompleteValueFormatter(data: any) { // might be able to just get rid of this since using ^^^^
    return data.firstName;

  }

  // TODO: This is incredibly unsafe, accepting raw text that can be used to inject some javascript
  autocompleListFormatter(data: any): SafeHtml {
    const html =
      `
      <span>${data.firstName} ${data.lastName}</span></br>
      <span>${data.dateOfBirth}</span>
    `;
    return html;
  }

  // Timepicker
  public toggleMode(): void {
    this.isMeridian = !this.isMeridian;
  };
}
