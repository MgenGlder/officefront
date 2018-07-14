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
import { map } from 'rxjs/operators';
@Component({
  templateUrl: 'new-order.component.html',
  styles: [`.btn.btn-primary { display: inline-block;width: 150px;margin-bottom: 0px;margin-bottom: 10px; margin-left: 5px;}
  #doctors-orders { display: flex; flex-direction: row; justify-content: center } `],
  encapsulation: ViewEncapsulation.Emulated
})
export class NewOrderComponent implements OnInit, OnDestroy {
  // ng2-select

  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin', 'Düsseldorf',
    'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg', 'Hamburg', 'Hannover',
    'Helsinki', 'Leeds', 'Leipzig', 'Lisbon', 'Łódź', 'London', 'Kraków', 'Madrid',
    'Málaga', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Naples', 'Palermo',
    'Paris', 'Poznań', 'Prague', 'Riga', 'Rome', 'Rotterdam', 'Seville', 'Sheffield',
    'Sofia', 'Stockholm', 'Stuttgart', 'The Hague', 'Turin', 'Valencia', 'Vienna',
    'Vilnius', 'Warsaw', 'Wrocław', 'Zagreb', 'Zaragoza'];

  private value: any = ['Athens'];


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
  public constructor(public orderBuilderService: OrderBuilderService,
    public orderService: OrderService,
    private patientService: PatientService,
    public router: Router,
    private _sanitizer: DomSanitizer,
    private db: DBService) {
    this.orderService.visitingDoctor = 'Dr. Hampson';
    this.orderService.referrer = 'Dr. Hampson';
    this.patientProfile = {
      dateOfBirth: '',
      firstName: '',
      lastName: ''
    }
    this.patientsObservable = patientService.getAllPatients().pipe(
      map(data => data.json())
    );
    this.patientsSubscription = this.patientsObservable.subscribe((patientData) => {
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

  autocompleListFormatter(data: any): SafeHtml { // No good way to test below
    const html =
      `
      <span>${data.firstName} ${data.lastName}</span></br>
      <span>${data.dateOfBirth}</span>
    `;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  // Timepicker
  public toggleMode(): void {
    this.isMeridian = !this.isMeridian;
  };
}
