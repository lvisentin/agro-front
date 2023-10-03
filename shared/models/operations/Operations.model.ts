import { Plot } from '../plots/Plots.model';
import { Product } from '../products/Products.model';

export interface Operation {
  id: number;
  description: String;
  plotId?: number;
  plot?: Plot;
  productId?: number;
  product?: Product;
  dosePerHecatare: number;
  totalCost: number;
  createdAt?: Date;
  executionDate: Date;
  updatedAt?: Date;
}
