import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewSpecificOrderComponent } from './view-specific-order.component';

const routes: Routes = [
  {
    path: '',
    component: ViewSpecificOrderComponent,
    data: {
      title: 'View Specific Order'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewSpecificOrderRoutingModule {}
