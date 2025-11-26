import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../../services/cart.service';


@Component({
  selector: 'app-checkout-confirmation',
  imports: [RouterModule],
  templateUrl: './checkout-confirmation.html',
  styleUrl: './checkout-confirmation.css',
})
export class CheckoutConfirmation {

    constructor(private cartService: CartService) {}

  ngOnInit() {
    // Vider le panier à l’arrivée sur la page confirmation
    this.cartService.clearCart();
  }

  

}
