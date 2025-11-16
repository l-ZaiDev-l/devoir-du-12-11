import type { Meta, StoryObj } from '@storybook/angular';
import { ProductCardComponent } from './product-card';
import { Product } from '../../../models/product.model';

const meta: Meta<ProductCardComponent> = {
  component: ProductCardComponent,
  title: 'Shop/Product Card',
  args: {
    product: {
      id: 1,
      name: 'Stylo Bleu',
      price: 2.5,
      created_at: '2025-01-10',
      ratings: [4, 5, 3],
    } as Product,
  },
};

export default meta;

export const Default: StoryObj<ProductCardComponent> = {};
