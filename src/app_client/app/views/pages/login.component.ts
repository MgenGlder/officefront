import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  // users: User[] = [];

  // constructor(private userService: UserService) { }

  // ngOnInit() {
  //   this.userService.getAll().pipe(first()).subscribe(
  //     users => {
  //       this.users = users.json();
  //     });
  // }
loginForm: FormGroup;
loading = false;
submitted = false;
returnUrl: string;
error = '';

constructor(
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private authenticationService: AuthenticationService
) {}

ngOnInit() {
  this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  this.authenticationService.logout();

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.loading = true;
  this.authenticationService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
}

}
