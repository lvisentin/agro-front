import { Productivity } from '@/shared/models/productivity/Productivity.model';

export interface ProductivityFormProps {
  productivity?: Productivity;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
  loading?: boolean;
}
