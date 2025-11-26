import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- important pour currency pipe
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { selectProductsList } from '../../state/products/products.selectors';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,            // <-- si tu utilises standalone
  imports: [CommonModule],      // <-- ajoute CommonModule ici
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private store: Store, private cartService: CartService) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.store.select(selectProductsList).subscribe(products => {
      this.product = products.find(p => p.id === productId);
    });
  }
  addToCart() {
  if (this.product) {
    this.cartService.addToCart(this.product);
    alert("Product added to cart!");
  }
}
}
