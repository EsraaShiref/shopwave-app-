import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header></app-header>
    <div class="container" style="min-height: 100vh;">
      <router-outlet />
    </div>
    <app-footer></app-footer>
  `,
})
export class LayoutComponent {}
