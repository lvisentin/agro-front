import { Purchase } from '@/shared/models/purchases/Purchases.model';

export interface PurcharseFormProps {
  purchase?: Purchase;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
  confirmBtn?: string;
  disabled?: boolean;
  loading?: boolean;
  pageTitle: string;
}
