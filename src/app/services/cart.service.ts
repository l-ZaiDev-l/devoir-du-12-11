import { Injectable } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  model: string;
  color: string;
  price: number;
  qty: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  loadCart() {
    const data = localStorage.getItem('cart');
    this.items = data ? JSON.parse(data) : [];
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  addToCart(product: any) {
    const existing = this.items.find(i => i.id === product.id);

    if (existing) {
      existing.qty++;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        model: product.model || '',
        color: product.color || '',
        price: product.price,
        qty: 1,
        image: product.image
      });
    }

    this.saveCart();
  }

  getItems() {
    return [...this.items];
  }

  increaseQty(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item) item.qty++;
    this.saveCart();
  }

  decreaseQty(id: number) {
    const item = this.items.find(i => i.id === id);
    if (item && item.qty > 1) item.qty--;
    this.saveCart();
  }

  setQty(id: number, qty: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, Math.min(100, qty));
      this.saveCart();
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.saveCart();
  }
}
