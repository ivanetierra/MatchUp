import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  registerForm = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      this._authService
        .register(this.registerForm.getRawValue())
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['/']));
    }
  }

}
