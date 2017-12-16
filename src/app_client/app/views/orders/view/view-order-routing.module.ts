import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOrderComponent } from './view-order.component';

const routes: Routes = [
  {
    path: '',
    component: ViewOrderComponent,
    data: {
      title: 'View Orders'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewOrderRoutingModule {}
