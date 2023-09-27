import { Document } from '@/shared/models/documents/Documents.model';

export interface DocumentFormProps {
  document?: Document;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
  loading?: boolean;
}
