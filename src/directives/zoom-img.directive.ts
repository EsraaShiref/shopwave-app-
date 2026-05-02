import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appZoomImg]',
  standalone: true
})
export class ZoomImgDirective {
  @Input() appZoomImg: number = 1.15; // zoom scale

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.35s ease');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'zoom-in');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.appZoomImg})`);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}