import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodeEditorsComponent } from './code-editors.component';

const routes: Routes = [
  {
    path: '',
    component: CodeEditorsComponent,
    data: {
      title: 'Code Editors'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeEditorsRoutingModule {}
