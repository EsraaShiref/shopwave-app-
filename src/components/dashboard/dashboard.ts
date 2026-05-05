import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDataService } from '../../services/product-data.service';
import { UserService } from '../../services/user.service';
import { IProduct } from '../../modles/iproduct';
import { IUser } from '../../modles/iuser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  // ── Product CRUD (static service) ─────────────────────────────
  products: IProduct[] = [];
  editingProduct: IProduct | null = null;
  showAddForm: boolean = false;
  newProduct = this.emptyProduct();

  // ── User CRUD (json-server) ────────────────────────────────────
  users: IUser[] = [];
  editingUser: IUser | null = null;
  showAddUserForm: boolean = false;
  newUser: Omit<IUser, 'id'> = { name: '', email: '', password: '' };

  constructor(
    private productService: ProductDataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadUsers();
  }

  // ════════════════════════════════════════
  // PRODUCT CRUD
  // ════════════════════════════════════════

  loadProducts(): void {
    this.products = this.productService.getAll();
  }

  addProduct(): void {
    this.productService.create(this.newProduct as Omit<IProduct, 'id'>);
    this.loadProducts();
    this.newProduct = this.emptyProduct();
    this.showAddForm = false;
  }

  startEditProduct(p: IProduct): void {
    this.editingProduct = { ...p };
  }

  saveProduct(): void {
    if (!this.editingProduct) return;
    this.productService.update(this.editingProduct.id!, this.editingProduct);
    this.editingProduct = null;
    this.loadProducts();
  }

  deleteProduct(id: number): void {
    if (confirm('Delete this product?')) {
      this.productService.delete(id);
      this.loadProducts();
    }
  }

  cancelEditProduct(): void { this.editingProduct = null; }

  private emptyProduct(): Partial<IProduct> {
    return {
      title: '', category: '', price: 0, stock: 0, brand: '',
      description: '', discountPercentage: 0, rating: 0,
      thumbnail: '', availabilityStatus: 'In Stock', Quantity: 0,
      tags: [], images: [], reviews: [], sku: '', weight: 0,
      warrantyInformation: '', shippingInformation: '', returnPolicy: '',
      minimumOrderQuantity: 1,
      dimensions: { width: 0, height: 0, depth: 0 },
      meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' }
    };
  }

  // ════════════════════════════════════════
  // USER CRUD (json-server)
  // ════════════════════════════════════════

  loadUsers(): void {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  addUser(): void {
    this.userService.create(this.newUser).subscribe(() => {
      this.loadUsers();
      this.newUser = { name: '', email: '', password: '' };
      this.showAddUserForm = false;
    });
  }

  startEditUser(u: IUser): void {
    this.editingUser = { ...u };
  }

  saveUser(): void {
    if (!this.editingUser?.id) return;
    this.userService.update(this.editingUser.id, this.editingUser).subscribe(() => {
      this.editingUser = null;
      this.loadUsers();
    });
  }

  deleteUser(id: number): void {
    if (confirm('Delete this user?')) {
      this.userService.delete(id).subscribe(() => this.loadUsers());
    }
  }

  cancelEditUser(): void { this.editingUser = null; }

  // ── Stats helpers ─────────────────────────────────────────────
  get totalProducts(): number { return this.products.length; }
  get totalCategories(): number {
    return new Set(this.products.map(p => p.category)).size;
  }
  get totalStock(): number {
    return this.products.reduce((s, p) => s + p.stock, 0);
  }
}
