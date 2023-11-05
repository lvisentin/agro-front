import { Plot } from '../plots/Plots.model';

export interface Productivity {
  id: number;
  plot?: Plot;
  plotId: number;
  marketPrice: number;
  quantity: number;
  measurementUnit: ProductivityMeasurementUnit;
  closedAt: Date;
}

export enum ProductivityMeasurementUnit {
  kg = 'kg',
  sc = 'sc',
  ton = 'ton',
}