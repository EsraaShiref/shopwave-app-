import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DecimalPipe as NumberPipe, NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgFor } from '@angular/common';
import { IProduct } from '../../modles/iproduct';
import { ZoomImgDirective } from '../../directives/zoom-img.directive';
import { DarkModeService } from '../../services/dark-mode.service';
import { BtnComponent } from '../btn/btn';
import { ProductListComponent } from '../product-list/product-list';
import { ProductDataService } from '../../services/product-data.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    NgClass, NumberPipe, FormsModule, NgFor, CommonModule,
    ZoomImgDirective, BtnComponent, ProductListComponent,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {

  products: IProduct[] = [];
  filteratedList: IProduct[] = [];
  selectedCategory: string = '';
  categories: string[] = [];
  cart: IProduct[] = [];
  protected Math = Math;

  // ── Template CRUD ──────────────────────────────────────────────
  showForm: boolean = false;
  isEditing: boolean = false;
  formProduct: Partial<IProduct> = this.emptyForm();

  @ViewChild(ProductListComponent) productListChild!: ProductListComponent;

  resetFilter = (): void => {
    this.selectedCategory = '';
    this.filteratedList = this.products;
  }

  constructor(
    private darkModeService: DarkModeService,
    private productDataService: ProductDataService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.darkModeService.isDark$.subscribe(isDark =>
      document.body.classList.toggle('dark-mode', isDark)
    );
  }

  // ── Load from service ──────────────────────────────────────────
  loadProducts(): void {
    this.products = this.productDataService.getAll();
    this.categories = this.productDataService.getCategories();
    this.filterByCategory();
  }

  filterByCategory(): void {
    this.filteratedList = this.selectedCategory === ''
      ? this.products
      : this.products.filter(p => p.category === this.selectedCategory);
  }

  getTotalPrice(): number {
    return this.filteratedList.reduce((sum, p) => sum + p.price, 0);
  }

  // ══════════════════════════════════════
  // TEMPLATE-DRIVEN CRUD
  // ══════════════════════════════════════

  openAddForm(): void {
    this.isEditing = false;
    this.formProduct = this.emptyForm();
    this.showForm = true;
  }

  openEditForm(product: IProduct): void {
    this.isEditing = true;
    this.formProduct = { ...product };
    this.showForm = true;
  }

  submitForm(form: NgForm): void {
    if (form.invalid) return;
    if (this.isEditing) {
      this.productDataService.update(this.formProduct.id!, this.formProduct);
    } else {
      this.productDataService.create(this.formProduct as Omit<IProduct, 'id'>);
    }
    this.loadProducts();
    this.cancelForm(form);
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productDataService.delete(id);
      this.loadProducts();
    }
  }

  cancelForm(form: NgForm): void {
    form.resetForm();
    this.showForm = false;
    this.formProduct = this.emptyForm();
  }

  private emptyForm(): Partial<IProduct> {
    return {
      title: '', category: '', price: 0, stock: 0,
      brand: '', description: '', discountPercentage: 0,
      rating: 0, thumbnail: '', availabilityStatus: 'In Stock',
      Quantity: 0, tags: [], images: [], reviews: [], sku: '', weight: 0,
      warrantyInformation: '', shippingInformation: '', returnPolicy: '',
      minimumOrderQuantity: 1,
      dimensions: { width: 0, height: 0, depth: 0 },
      meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' }
    };
  }

  // ══════════════════════════════════════
  // CART
  // ══════════════════════════════════════

  addToCart(product: IProduct): void {
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      existing.Quantity += product.Quantity;
      existing.stock = product.stock - existing.Quantity;
    } else {
      this.cart.push({ ...product });
      product.stock -= product.Quantity;
    }
    product.Quantity = 0;
  }

  removeFromCart(item: IProduct): void {
    const prod = this.products.find(p => p.id === item.id);
    if (prod) { prod.Quantity = 0; prod.stock += item.Quantity; }
    this.cart = this.cart.filter(c => c.id !== item.id);
  }

  increaseCartItem(item: IProduct): void {
    const prod = this.products.find(p => p.id === item.id);
    if (prod && item.Quantity < prod.stock) { item.Quantity++; prod.stock--; }
  }

  decreaseCartItem(item: IProduct): void {
    if (item.Quantity > 1) { item.Quantity--; item.stock++; }
    else this.removeFromCart(item);
  }

  clearCart(): void {
    this.cart.forEach(ci => {
      const p = this.products.find(p => p.id === ci.id);
      if (p) { p.stock += ci.Quantity; p.Quantity = 0; }
    });
    this.cart = [];
  }

  getTotalItems(): number { return this.cart.reduce((s, i) => s + i.Quantity, 0); }
  getSubtotal(): number { return this.cart.reduce((s, i) => s + (i.price / (1 - i.discountPercentage / 100)) * i.Quantity, 0); }
  getDiscount(): number { return this.getSubtotal() - this.getTotal(); }
  getTotal(): number { return this.cart.reduce((s, i) => s + i.price * i.Quantity, 0); }

  toggleDarkMode(): void { this.darkModeService.toggle(); }
  get isDark(): boolean { return this.darkModeService.isDark; }
}