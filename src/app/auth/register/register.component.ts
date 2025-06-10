// src/app/auth/register/register.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Adicione RouterLink se for usar routerLink no template
import { MatIconModule } from '@angular/material/icon'; // Importe MatIconModule

import { AuthService } from '../../core/services/auth.service';
import { UserRegister } from '../../core/models/user-register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink, // Necessário para [routerLink] no template
    MatIconModule // Adicione MatIconModule aqui
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Mude para .css
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^\s*\+?\s*([0-9][\s-]*){8,15}$/)],
      address: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  get name() { return this.registerForm.get('name'); }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get phone() { return this.registerForm.get('phone'); }
  get address() { return this.registerForm.get('address'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const userData: UserRegister = {
      name: this.name?.value,
      username: this.username?.value,
      email: this.email?.value,
      password: this.password?.value,
      phone: this.phone?.value || undefined,
      address: this.address?.value || undefined
    };

    this.authService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Account created successfully! You will be redirected.';
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'An error occurred during registration.';
        if (err.error && typeof err.error === 'string') {
           this.errorMessage = err.error;
        } else if (err.error && err.error.message && typeof err.error.message === 'string') {
           this.errorMessage = err.error.message;
        }
      }
    });
  }
}