import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { UserService } from '../../services/auth/user.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(
      users => {
        this.users = users.json();
      });
  }

}
