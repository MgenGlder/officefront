import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'view-order.component.html'
})
export class ViewOrderComponent {

  public data;
  public filterQuery = '';

  constructor(private http:Http) {
    http.get('./assets/patientData.json')
      .subscribe((data)=> {
        setTimeout(()=> {
          this.data = data.json();
        }, 2000);
      });
  }

  public toInt(num:string) {
    return +num;
  }

  public sortByWordLength = (a:any) => {
    return a.name.length;
  }
}
