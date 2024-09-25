import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {}

  login(): void {
    console.log(this.loginForm.value);
  }
}
