import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopApiService, ProductRating } from '../../services/shop-api';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-product-rating-page',
  templateUrl: './product-rating-page.html',
  imports: [CommonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatProgressBarModule,
  ReactiveFormsModule]
})
export class ProductRatingPageComponent {
  ratingForm: FormGroup;
  ratingResult: ProductRating | null = null;
  loading = false;
  error: any = null;

  constructor(private fb: FormBuilder, private api: ShopApiService) {
    this.ratingForm = this.fb.group({
      productId: [null, Validators.required],
    });
  }

  fetchRating() {
    if (!this.ratingForm.valid) return;

    this.loading = true;
    this.error = null;
    this.ratingResult = null;

    const id = this.ratingForm.value.productId;

    this.api.getProductRating(id).subscribe({
      next: (res) => {
        this.ratingResult = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    });
  }
}
