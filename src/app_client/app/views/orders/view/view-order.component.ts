import { Component, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../../../services/order.service';
import { PatientService } from '../../../services/patient.service';
@Component({
  templateUrl: 'view-order.component.html'
})
export class ViewOrderComponent implements OnDestroy {

  public data;
  public filterQuery = '';
  public patientsSubscription: Subscription;
  public patientsObservable: Observable<Object>;
  public patientData;
  public ordersObservable: Observable<Object>;
  public ordersSubscription: Subscription;
  public orderData;
  constructor(patientService: PatientService, orderService: OrderService) {
    this.patientsObservable = patientService.getAllPatients();
    this.patientsSubscription = this.patientsObservable
      .pipe(map((data: Response) => data)).subscribe(
        (patientData) => {
          this.patientData = patientData
        });

    this.ordersObservable = orderService.getAllOrders();
    this.ordersSubscription = this.ordersObservable
      .pipe(map((data: Response) => data)).subscribe(
        (orderData) => {
          this.orderData = orderData;
        });
  }

  ngOnDestroy() {
    this.patientsSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength(a: any) {
    return a.name.length;
  }
}
