import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService, CartItem } from '../../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-summary',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout-summary.html',
  styleUrls: ['./checkout-summary.css'],
})
export class CheckoutSummary implements OnInit {
  
  cart: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getItems();  // ← récupération correcte
  }
}
