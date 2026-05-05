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
// FIX: DarkModeDirective removed — it was imported but never used in the template (NG8113)

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ZoomImgDirective],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductListComponent implements AfterViewInit, AfterContentInit {

  protected Math = Math;

  // ── @Input: filtered products array from parent ──
  @Input() products: IProduct[] = [];

  // ── @Input: total price calculated in parent ──
  @Input() totalPrice: number = 0;

  // ── @Output: fires product up to parent's addToCart() ──
  @Output() addToCartEvent = new EventEmitter<IProduct>();

  // ── @Output: fires product up to parent's openEditForm() ──
  @Output() editProductEvent = new EventEmitter<IProduct>();

  // ── @Output: fires product id up to parent's deleteProduct() ──
  @Output() deleteProductEvent = new EventEmitter<number>();

  // ── ViewChild: reads #listTitle from this component's own template ──
  @ViewChild('listTitle') listTitleRef!: ElementRef;

  // ── ContentChild: reads #customHeader projected from the parent ──
  @ContentChild('customHeader') customHeaderRef!: ElementRef;

  ngAfterViewInit(): void {
    if (this.listTitleRef) {
      console.log('ViewChild listTitle:', this.listTitleRef.nativeElement.textContent);
    }
  }

  ngAfterContentInit(): void {
    if (this.customHeaderRef) {
      console.log('ContentChild customHeader:', this.customHeaderRef.nativeElement.textContent);
    }
  }
}