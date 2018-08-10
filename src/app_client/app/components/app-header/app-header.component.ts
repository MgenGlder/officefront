import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {
  constructor(public auth: AuthenticationService, location: Location) {}

  logout() {
    this.auth.logout();
    location.reload();
  }
 }
