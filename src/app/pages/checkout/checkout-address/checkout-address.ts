import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutService } from '../../../services/checkout.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-address',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout-address.html',
  styleUrl: './checkout-address.css',
})
export class CheckoutAddress {

  address: any = {
    fullname: '',
    city: '',
    line: ''
  };

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  saveAddress() {
    this.checkoutService.address = this.address;
    this.router.navigate(['/app/checkout-confirmation']);
  }
}
