import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: 'loading-buttons.component.html',
  styleUrls: ['../../../../../node_modules/ladda/dist/ladda-themeless.min.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingButtonsComponent {
  // trigger-variable for Ladda
  isLoading: boolean = false;

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }
}
