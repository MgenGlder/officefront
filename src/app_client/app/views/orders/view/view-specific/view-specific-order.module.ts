import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular 2 Input Mask
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

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
  declarations: [
    ViewSpecificOrderComponent,
  ]
})
export class ViewSpecificOrderModule { }
