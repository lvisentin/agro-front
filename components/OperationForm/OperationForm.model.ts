import { Operation } from '@/shared/models/operations/Operations.model';

export interface OperationFormProps {
  operation?: Operation;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
  loading?: boolean;
}
