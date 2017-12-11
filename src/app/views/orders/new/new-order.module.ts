import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular 2 Input Mask
import { TextMaskModule } from 'angular2-text-mask';

// Timepicker
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// Datepicker
import { DatepickerModule } from 'ngx-bootstrap/datepicker';

//Tabs
import { TabsModule } from 'ngx-bootstrap/tabs';

// Ng2-select
import { SelectModule } from 'ng2-select';

//Routing
import { NewOrderRoutingModule } from './new-order-routing.module';

import { SpecialistComponent } from './OrderSelection/specialist.component';
import { NurseComponent } from './OrderSelection/nurse.component';
import { TestComponent } from './OrderSelection/test.component';
import { BloodworkComponent } from './OrderSelection/bloodwork.component';
import { OrderBuilderService } from '../../../services/order-builder.service';
import { OrderService } from '../../../services/order.service';
import { EnteredOrderComponent } from './OrderSelection/entered.component';
import { NewOrderComponent } from './new-order.component';
import { OrderContainerComponent } from './OrderSelection/OrderContainer/order-container.component';
import { ChoiceWrapperComponent } from './OrderSelection/choice-wrapper.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { DatePickerContainerComponent } from './datepickercontainer.component';

import { OrderNameTransformPipe } from '../../../pipes/order-type.pipe';
import { DBService } from '../../../services/db.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewOrderRoutingModule,
    TextMaskModule,
    TimepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    SelectModule,
    TabsModule,
    NguiAutoCompleteModule
  ],
  declarations: [
    NewOrderComponent,
    NurseComponent,
    SpecialistComponent,
    TestComponent,
    BloodworkComponent,
    OrderContainerComponent,
    OrderNameTransformPipe,
    EnteredOrderComponent,
    ChoiceWrapperComponent,
    DatePickerContainerComponent
  ],
  providers: [
    OrderService,
    OrderBuilderService,
    DBService
  ]
})
export class NewOrderModule { }
