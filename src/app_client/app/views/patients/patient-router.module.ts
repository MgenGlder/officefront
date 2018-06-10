import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessfulNewPatientComponent } from './new/successful-new-patient.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Patients'
    }
  },
  {
    path: 'new',
    data: {
      title: 'Successful New Patient added!'
    },
    loadChildren: './new/new-patient.module#NewPatientModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
