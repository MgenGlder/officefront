import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialistComponent } from './OrderSelection/specialist.component';
import { TestComponent } from './OrderSelection/test.component';
import { BloodworkComponent } from './OrderSelection/bloodwork.component';
import { EnteredOrderComponent } from './OrderSelection/entered.component';
import { NewOrderComponent } from './new-order.component';
import { NurseComponent } from './OrderSelection/nurse.component';
import { OrderSubmittedComponent } from './ordersubmitted.component';
import { OrderNotSubmittedComponent } from './ordernotsubmitted.component';
const routes: Routes = [
  {
    path: '',
    component: NewOrderComponent,
    data: {
      title: 'New Orders'
    },
    children: [
        {path: 'specialist', component: SpecialistComponent },
        {path: 'nurse', component: NurseComponent},
        {path: 'test', component: TestComponent },
        {path: 'bloodwork', component: BloodworkComponent },
        {path: 'entered/:order', component: EnteredOrderComponent}
    ]
  },
  {
    path: 'submitted',
    component: OrderSubmittedComponent,
    data: {
      title: 'Order Submitted!'
    }
  },
  {
    path: 'notsubmitted',
    component: OrderNotSubmittedComponent,
    data: {
      title: 'Order was not submitted!'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewOrderRoutingModule {}
