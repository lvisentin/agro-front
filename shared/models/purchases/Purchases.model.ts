import { PurchaseProduct } from "../PurchaseProduct/PurchaseProduct.model";

export interface Purchase {
  id: number;
  description: string;
  property: string;
  propertyId: number;
  totalCost: number;
  purchaseProducts: Array<PurchaseProduct>;
}
