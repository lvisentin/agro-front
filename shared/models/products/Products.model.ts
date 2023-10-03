import { Property } from '../properties/Properties.model';

export interface Product {
  id: number;
  categoryId: number;
  category: ProductCategory;
  propertyId: number;
  property: Property;
  name: string;
  code: string;
  quantity: number;
  unitPrice: number;
  minimumQuantity: number;
  measurementUnit: ProductMeasurementUnit;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum ProductMeasurementUnit {
  kg = 'kg',
  g = 'g',
  l = 'l',
  ml = 'ml',
  sc = 'sc',
  ton = 'ton',
}

export interface ProductCategory {
  id: number;
  name: string;
}
