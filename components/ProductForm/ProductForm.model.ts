import { Product } from '@/shared/models/products/Products.model';

export interface ProductFormProps {
  product?: Product;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
  loading?: boolean;
}
