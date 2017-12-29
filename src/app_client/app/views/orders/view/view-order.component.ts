import { Component, OnDestroy } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { PatientService } from "../../../services/patient.service";
import { OrderService } from "../../../services/order.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
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
  constructor(private http: Http, patientService: PatientService, orderService: OrderService) {
    /*  this.http.get('./assets/patientData.json')
       .subscribe((data) => {
         this.data = data.json();
         console.log(this.data);
       }); */
    this.patientsObservable = patientService.getAllPatients();

    this.patientsSubscription = this.patientsObservable
      .map(data => data.json())
      .subscribe((patientData) => {
        this.patientData = patientData
        console.log(this.patientData);
      })

    this.ordersObservable = orderService.getAllOrders();

    this.ordersSubscription = this.ordersObservable
      .map(data => data.json())
      .subscribe((orderData) => {
        this.orderData = orderData;
        console.log(this.orderData);
      })
  }
  
  ngOnDestroy() {
    this.patientsSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
    console.log("destroyed in view order");
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }
}
