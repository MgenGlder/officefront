import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// Angular 2 Input Mask
import { DataTableModule } from 'angular2-datatable';
import { OrderService } from './../../../../services/order.service';
// Routing
import { ViewSpecificOrderRoutingModule } from './view-specific-order-routing.module';
import { ViewSpecificOrderComponent } from './view-specific-order.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ViewSpecificOrderRoutingModule,
    DataTableModule,
    HttpModule
  ],
  providers: [
    OrderService
  ],
  declarations: [
    ViewSpecificOrderComponent,
  ]
})
export class ViewSpecificOrderModule { }
