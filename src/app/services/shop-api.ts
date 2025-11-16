import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  ratings?: any[];
}

export interface ProductRating {
  product_id: number;
  avg_rating: number;
  count: number;
}

export interface ProductsListResponse {
  count: number;
  results: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ShopApiService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/token/', { username, password });
  }

  refreshToken(refresh: string): Observable<{ access: string }> {
  return this.http.post<{ access: string }>(
    '/api/auth/token/refresh/',
    { refresh }
  );
}

  getProducts(params: { page?: number; pageSize?: number; minRating?: number; ordering?: string } = {}): Observable<ProductsListResponse> {
    const { page = 1, pageSize = 10, minRating, ordering } = params;

    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    if (minRating != null) httpParams = httpParams.set('min_rating', minRating.toString());
    if (ordering) httpParams = httpParams.set('ordering', ordering);

    return this.http.get<ProductsListResponse>('/api/products/', { params: httpParams });
  }

  getProductRating(id: number): Observable<ProductRating> {
    return this.http.get<ProductRating>(`/api/products/${id}/rating/`);
  }
}
