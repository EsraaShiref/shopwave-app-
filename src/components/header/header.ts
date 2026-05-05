import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private authService: AuthService, private router: Router) {}

  get userName(): string {
    return this.authService.getUser()?.name || '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
