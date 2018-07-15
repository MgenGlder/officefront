import { Component, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OrderService } from '../../../services/order.service';
import { PatientService } from '../../../services/patient.service';
import { map } from 'rxjs/operators';
@Component({
  templateUrl: 'view-order.component.html'
})
export class ViewOrderComponent implements OnDestroy {

  public data;
  public filterQuery = '';
  public patientsSubscription: Subscription;
  public patientsObservable: Observable<Response>;
  public patientData;
  public ordersObservable: Observable<Response>;
  public ordersSubscription: Subscription;
  public orderData;
  constructor(patientService: PatientService, orderService: OrderService) {
    this.patientsObservable = patientService.getAllPatients();
    this.patientsSubscription = this.patientsObservable
      .pipe(map(data => data.json())).subscribe(
        (patientData) => {
          this.patientData = patientData
        });

    this.ordersObservable = orderService.getAllOrders();
    this.ordersSubscription = this.ordersObservable
      .pipe(map(data => data.json())).subscribe(
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
