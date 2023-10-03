import { PurchaseProduct } from "../PurchaseProduct/PurchaseProduct.model";

export interface Purchase {
  id: number;
  description: string;
  property: any;
  propertyId: number;
  totalCost: number;
  purchaseProducts: Array<PurchaseProduct>;
}
