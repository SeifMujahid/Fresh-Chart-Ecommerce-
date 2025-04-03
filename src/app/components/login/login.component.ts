import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}
  errorMessage: string = '';
  spinner: boolean = false;
  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
    ],
  });

  handelForm(): void {
    this.spinner = true;
    let userData = this.loginForm.value;
    if (this.loginForm.valid) {
      this._AuthService.login(userData).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.spinner = false;
            this._Router.navigate(['/home']);
            localStorage.setItem('eToken', response.token);
            this._AuthService.decodeToken();
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.spinner = false;
        },
      });
    }
  }
}
