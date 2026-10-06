import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginError = false;

  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {

    this.loginError = false;

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    const success = this.authService.login(
      username,
      password
    );

    if (success) {

      this.router.navigate(['/employees']);

    } else {

      this.loginError = true;

    }
  }
}