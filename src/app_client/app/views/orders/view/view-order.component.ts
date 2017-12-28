import { Component } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { PatientService } from "../../../services/patient.service";
import { Observable } from "rxjs/Observable";
@Component({
  templateUrl: 'view-order.component.html'
})
export class ViewOrderComponent {

  public data;
  public filterQuery = '';
  public patients: Observable<Response>;
  public patientData;
  constructor(private http: Http, patientService: PatientService) {
    /*  this.http.get('./assets/patientData.json')
       .subscribe((data) => {
         this.data = data.json();
         console.log(this.data);
       }); */
    this.patients = patientService.getAllPatients();

    this.patients
      .map(data => data.json())
      .subscribe((patientData) => {
        this.patientData = patientData
        console.log(this.patientData);
      })
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }
}
