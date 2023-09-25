import { Purchase } from '@/shared/models/purchases/Purchases.model';

export interface PurcharseFormProps {
  purchase?: Purchase;
  submitFunction: () => void;
  cancelFunction: () => void;
  loading?: boolean;
}
