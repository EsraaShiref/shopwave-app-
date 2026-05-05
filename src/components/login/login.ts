import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter email and password.';
      return;
    }

    this.loading = true;

    // login() now returns Observable<IUser | undefined>
    // because we use Array.find() client-side (undefined = not found)
    this.userService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.loading = false;

        if (user) {
          // ✅ Found — save session and go to home
          this.authService.setUser(user);
          this.router.navigate(['/home']);
        } else {
          this.errorMsg = 'Incorrect email or password. Please try again.';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Server error. Make sure json-server is running on port 3000.';
      }
    });
  }
}