import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Routing
import { BasicFormsRoutingModule } from './basic-forms-routing.module';

import { BasicFormsComponent } from './basic-forms.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    BasicFormsRoutingModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    BasicFormsComponent
  ]
})
export class BasicFormsModule { }
