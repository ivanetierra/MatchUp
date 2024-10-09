import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  firebaseError: string = '';

  registerForm: FormGroup = this._fb.group(
    {
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    },
    { validator: this.checkPasswords }
  );

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  register() {
    if (this.registerForm.valid) {
      this._authService
        .register(this.registerForm.getRawValue())
        .pipe(take(1))
        .subscribe({
          next: () => this.router.navigate(['/']),
          error: (error) => {
            if (error.code === 'auth/email-already-in-use') {
              this.firebaseError = 'Email is already in use.';
            } else if (error.code === 'auth/invalid-email') {
              this.firebaseError = 'Invalid email format.';
            } else {
              this.firebaseError = 'An error occurred. Please try again.';
            }
          }
    });
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
