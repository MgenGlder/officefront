import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewPatientComponent } from './new-patient.component';
import { SuccessfulNewPatientComponent } from './successful-new-patient.component';

const routes: Routes = [
  {
    path: '',
    component: NewPatientComponent,
    data: {
      title: 'New Patient'
    }
  },
  {
    path: 'successful',
    component: SuccessfulNewPatientComponent,
    data: {
      title: 'Successfully added'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPatientRoutingModule {}
