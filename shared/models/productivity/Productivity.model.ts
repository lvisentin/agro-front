import { Plot } from '../plots/Plots.model';

export interface Productivity {
  id: number;
  plot?: Plot;
  plotId: number;
  marketPrice: number;
  quantity: number;
  unitPrice: number;
  closedAt: Date;
}