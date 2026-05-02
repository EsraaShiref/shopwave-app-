import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDarkMode]',
  standalone: true
})
export class DarkModeDirective implements OnInit, OnDestroy {
  private sub!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    this.sub = this.darkModeService.isDark$.subscribe(isDark => {
      if (isDark) {
        this.renderer.addClass(document.body, 'dark-mode');
      } else {
        this.renderer.removeClass(document.body, 'dark-mode');
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}