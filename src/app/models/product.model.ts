export interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
  ratings?: number[]; // facultatif, selon ton API
  // tu peux ajouter d’autres champs si nécessaire
}
