import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _Router: Router
  ) {}

  step: number = 1;
  email: string = '';

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  newPasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z1-9]{6,}$/),
    ]),
  });

  showSuccess(message: string) {
    this._ToastrService.success(message);
  }

  showError(message: string) {
    this._ToastrService.error(message);
  }

  back(): void {
    this.step--;
  }

  handelForget(btn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    this._AuthService.forgetPass(this.forgetForm.value).subscribe({
      next: (response) => {
        this.email = this.forgetForm.get('email')?.value;
        this.showSuccess(response.message);
        this.step++;
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
      error: (err) => {
        this.showError(err.error.message);
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
    });
  }

  handelResetCode(btn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    this._AuthService.resetCode(this.resetCodeForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.showSuccess(response.status);
        this.step++;
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
      error: (err) => {
        this.showError(err.error.message);
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
    });
  }

  handelNewPassword(btn: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btn, 'disabled', 'true');
    let newPasswordFormValue = this.newPasswordForm.value;
    newPasswordFormValue.email = this.email;
    this._AuthService.resetPass(newPasswordFormValue).subscribe({
      next: (response) => {
        if (response?.token) {
          localStorage.setItem('eToken', response.token);
          this._Router.navigate(['/home']);
          this._Renderer2.removeAttribute(btn, 'disabled');
        }
      },
      error: (err) => {
        this.showError(err.error.message);
        this._Renderer2.removeAttribute(btn, 'disabled');
      },
    });
  }
}
