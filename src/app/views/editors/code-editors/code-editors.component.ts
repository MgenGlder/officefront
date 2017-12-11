import {AfterViewInit, Component, ViewChild} from '@angular/core';

import 'brace/index';
import 'brace/theme/eclipse';
import 'brace/theme/monokai';
import 'brace/mode/markdown';
import 'brace/mode/javascript';
import 'brace/ext/language_tools.js';
// declare const ace: any;

const defaults = {
  markdown: '# Ace \n(Ajax.org Cloud9 Editor)  \n' +
  '============================  \n' +
  'Ace is a standalone `code editor` written in **JavaScript**. \n' +
  '- Our goal is to create a _browser based_ editor that matches and extends the features, usability and performance of existing native editors such as TextMate, Vim or Eclipse.  \n' +
  '- It can be easily embedded in any web page or JavaScript application.  \n' +
  '- Ace is developed as the primary editor for [Cloud9 IDE](http://www.cloud9ide.com/) and the successor of the Mozilla Skywriter (Bespin) Project.  \n',
  javascript: 'const component = {\n\tname: "ng2-ace-editor",\n\tauthor: "François-Xavier Montigny",\n\trepo: "https://github.com/fxmontigny/ng2-ace-editor"\n};',
  html: '<h1>I ♥ ng2-ace-editor</h1>'
};

@Component({
  templateUrl: 'code-editors.component.html'
})
export class CodeEditorsComponent implements AfterViewInit {
  @ViewChild('editor') editor;

  text:string = defaults.markdown;
  options:any = {
    maxLines: 1000,
    printMargin: false,
    wrap: true
  };

  ngAfterViewInit () {
    this.editor.setMode('markdown')
    this.editor.setTheme('monokai')
  }

  onThemeChange (e) {
    const theme = e.target.value
    this.editor.setTheme(theme)
  }

  onModeChange (e) {
    const mode = e.target.value
    this.text = defaults[mode]
    this.editor.setMode(mode)
  }
}
