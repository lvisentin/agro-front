import { Property } from '../properties/Properties.model';

export interface Plot {
  id: number;
  name: string;
  farmingType: string;
  size: number;
  property?: Property;
  propertyId: number;
}
