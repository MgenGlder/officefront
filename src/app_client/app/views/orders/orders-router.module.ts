import { AuthGuard } from './../../guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Orders'
    },
    canActivate: [AuthGuard],
    children: [
        {
          path: 'new',
          loadChildren: './new/new-order.module#NewOrderModule'
        },
        {
          path: 'view',
          loadChildren: './view/view-order.module#ViewOrderModule'
        },
        {
            path: 'view/:id',
            loadChildren: './view/view-specific/view-specific-order.module#ViewSpecificOrderModule'
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
