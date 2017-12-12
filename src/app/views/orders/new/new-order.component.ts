import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OrderBuilderService, } from '../../../services/order-builder.service'
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/pending-order.model'
import { Router } from '@angular/router';
import { DBService } from '../../../services/db.service';
@Component({
  templateUrl: 'new-order.component.html',
  styles: [`.btn.btn-primary { display: inline-block;width: 150px;margin-bottom: 0px;margin-bottom: 10px; margin-left: 5px;} #doctors-orders { display: flex; flex-direction: row; justify-content: center } `],
  encapsulation: ViewEncapsulation.Emulated
})
export class NewOrderComponent implements OnInit {

  public examplePatients;
  // Angular 2 Input Mask

  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  private orders: Array<Order>;
  public patientProfile;
  public constructor(public orderBuilderService: OrderBuilderService, 
                      public orderService: OrderService, 
                      public router: Router, 
                      private _sanitizer: DomSanitizer,
                      private db : DBService) {
    this.orderService.visitingDoctor = "Dr. Hampson";
    this.orderService.referrer = "Dr. Hampson";
    this.examplePatients = db.getPatientList();
    this.patientProfile = {
      visitingDoctor: this.orderService.visitingDoctor,
      reporter: this.orderService.referrer,
      dateOfBirth: '',
      firstName: '',
      lastName: ''
    }
    
  }

  submitOrder() {
    this.orderService.submitOrder(this.patientProfile);
  }
  ngOnInit() {
    this.orders = this.orderService.getOrders();
    
  }
  firstNameAutoCompleted(data: any) {
    console.log(data);
    this.patientProfile.lastName = data.lastName;
    this.patientProfile.dateOfBirth = data.dob;
    this.patientProfile.firstName = data.firstName;
  }
  autocompleteValueFormatter =  (data: any) => { //might be able to just get rid of this since using ^^^^
    console.log(data.firstName);
    console.log(data);    
    return data.firstName;
    
  }
  autocompleListFormatter = (data: any): SafeHtml => {
    let html = 
    `
      <span>${data.firstName} ${data.lastName}</span></br>
      <span>${data.dob}</span>
    `;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  public enteredOrderNavigation(typeOfOrder: string) {
    console.log("reached the event in the parent");
    console.log(typeOfOrder);
    this.router.navigate(['entered'], { skipLocationChange: true });

  }

  // Timepicker

  public hstep: number = 1;
  public mstep: number = 15;
  public ismeridian: boolean = true;
  public isEnabled: boolean = true;

  public mytime: Date = new Date();
  public options: any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  public toggleMode(): void {
    this.ismeridian = !this.ismeridian;
  };

  public update(): void {
    let d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime = d;
  };

  public changed(): void {
    console.log('Time changed to: ' + this.mytime);
  };

  public clear(): void {
    this.mytime = void 0;
  };

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

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }
}
