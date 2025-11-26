import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart {

  items: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();

    // Synchronisation entre onglets
    window.addEventListener('storage', () => {
      this.items = this.cartService.getItems();
    });
  }

  increase(item: CartItem) {
    this.cartService.increaseQty(item.id);
    this.items = this.cartService.getItems();
  }

  decrease(item: CartItem) {
    this.cartService.decreaseQty(item.id);
    this.items = this.cartService.getItems();
  }

  updateQty(item: CartItem, event: any) {
    const value = Number(event.target.value);
    this.cartService.setQty(item.id, value);
    this.items = this.cartService.getItems();
  }

  delete(item: CartItem) {
    this.cartService.removeItem(item.id);
    this.items = this.cartService.getItems();
  }

  getTotal() {
  return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  goToCheckout() {
    this.router.navigate(['/app/checkout-summary']);
  }
}
