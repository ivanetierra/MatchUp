import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  wrongCredentials = signal<boolean>(false);

  loginForm = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    
    console.log('login');
    this.wrongCredentials.set(false);

    this._authService
      .login(this.loginForm.getRawValue())
      .then(response => {
        this._router.navigate(['/']);
      })
      .catch(error => {
        console.log('error', error);
        this.wrongCredentials.set(true);
      });
    console.log(this.loginForm.value);
  }
}
