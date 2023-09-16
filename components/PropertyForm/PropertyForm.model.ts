import { Property } from '@/shared/services/properties/Properties.model';

export interface PropertyFormProps {
  property?: Property;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
}
