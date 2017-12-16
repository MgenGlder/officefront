import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular 2 Input Mask
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { ViewOrderRoutingModule } from './view-order-routing.module';

import { ViewOrderComponent } from './view-order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ViewOrderRoutingModule,
    DataTableModule,
    HttpModule
  ],
  declarations: [
    ViewOrderComponent,
    DataFilterPipe
  ]
})
export class ViewOrderModule { }
