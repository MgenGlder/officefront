import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ng2-ace-editor
import { AceEditorModule } from 'ng2-ace-editor';

//Routing
import { CodeEditorsRoutingModule } from './code-editors-routing.module';

import { CodeEditorsComponent } from './code-editors.component';

@NgModule({
  imports: [
    FormsModule,
    CodeEditorsRoutingModule,
    AceEditorModule
  ],
  declarations: [
    CodeEditorsComponent
  ]
})
export class CodeEditorsModule { }
