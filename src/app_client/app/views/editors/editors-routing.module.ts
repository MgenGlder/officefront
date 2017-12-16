import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Editors'
    },
    children: [
      {
        path: 'text-editors',
        loadChildren: './text-editors/text-editors.module#TextEditorsModule'
      },
      {
        path: 'code-editors',
        loadChildren: './code-editors/code-editors.module#CodeEditorsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorsRoutingModule {}
