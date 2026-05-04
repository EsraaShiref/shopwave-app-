import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ContentChild,
  ElementRef,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../modles/iproduct';
import { ZoomImgDirective } from '../../directives/zoom-img.directive';
import { DarkModeDirective } from '../../directives/dark-mode.directive';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ZoomImgDirective, DarkModeDirective],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements AfterViewInit, AfterContentInit {

  protected Math = Math;

  // ── 1. @Input — receives the filtered products array from parent ──
  @Input() products: IProduct[] = [];

  // ── 2. @Input — receives the total price calculated in parent ────
  @Input() totalPrice: number = 0;

  // ── 3. @Output — emits the product up to the parent when "Add to Cart" is clicked ──
  // The child should NOT own the cart; the parent (Products) manages cart state.
  @Output() addToCartEvent = new EventEmitter<IProduct>();

  // ── 4. ViewChild — accesses a DOM element INSIDE this component's own template ──
  @ViewChild('listTitle') listTitleRef!: ElementRef;

  // ── 5. ContentChild — accesses projected content from the PARENT ──
  // Matches the #customHeader template reference variable on the projected element.
  @ContentChild('customHeader') customHeaderRef!: ElementRef;

  ngAfterViewInit(): void {
    if (this.listTitleRef) {
      console.log('ViewChild listTitle text:', this.listTitleRef.nativeElement.textContent);
    }
  }

  ngAfterContentInit(): void {
    if (this.customHeaderRef) {
      console.log('ContentChild customHeader:', this.customHeaderRef.nativeElement.textContent);
    }
  }
}