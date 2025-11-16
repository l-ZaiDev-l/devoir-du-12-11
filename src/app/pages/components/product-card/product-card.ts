import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './product-card.html',
})
export class ProductCardComponent {
  @Input() product!: Product;

  get averageRating(): number | null {
    if (this.product?.ratings?.length) {
      const sum = this.product.ratings.reduce((acc, r) => acc + r, 0);
      return sum / this.product.ratings.length;
    }
    return null;
  }
}
