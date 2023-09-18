import { Property } from '@/shared/models/properties/Properties.model';

export interface PropertyFormProps {
  property?: Property;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
  loading?: boolean;
}
