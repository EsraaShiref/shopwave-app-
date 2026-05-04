import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './btn.html',
  styleUrl: './btn.css',
})
export class BtnComponent {
  // ── All 5 properties are passed from the PARENT via @Input ──
  @Input() title: string = 'Click';
  @Input() width: string = 'auto';
  @Input() height: string = '40px';
  @Input() color: string = '#0d6efd';    // background color
  @Input() action!: () => void;          // the method to call on click

  // Internal click handler that calls whatever action the parent passed
  handleClick(): void {
    if (this.action) {
      this.action();
    }
  }
}
