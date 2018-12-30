import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth/authentication.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
loading = false;
submitted = false;
returnUrl: string;
error = '';

constructor(
  public formBuilder: FormBuilder,
  public route: ActivatedRoute,
  public router: Router,
  public authenticationService: AuthenticationService
) {}

ngOnInit() {
  this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  this.authenticationService.logout();

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

onRegister() {
  this.router.navigate(['/pages/register']);
}
get f() { return this.loginForm.controls; }

onSubmit() {
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.loading = true;
  this.authenticationService.login(this.f.username.value.toLowerCase(), this.f.password.value)
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
