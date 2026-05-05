import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMsg: string = '';
  successMsg: string = '';
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  signup(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMsg = 'All fields are required.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMsg = 'Password must be at least 6 characters.';
      return;
    }

    this.loading = true;

    this.userService.checkEmailExists(this.email).subscribe({
      next: (exists) => {
        if (exists) {
          this.loading = false;
          this.errorMsg = 'An account with this email already exists. Please log in instead.';
          return;
        }

        // Email is free — proceed with creation
        this.userService.create({
          name: this.name,
          email: this.email,
          password: this.password,
        }).subscribe({
          next: () => {
            this.loading = false;
            this.successMsg = 'Account created! Redirecting to login...';
            setTimeout(() => this.router.navigate(['/login']), 1500);
          },
          error: () => {
            this.loading = false;
            this.errorMsg = 'Server error. Make sure json-server is running on port 3000.';
          }
        });
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Server error. Make sure json-server is running on port 3000.';
      }
    });
  }
}