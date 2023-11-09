import { Plot } from '../plots/Plots.model';

export interface Production {
  id: number;
  plot?: Plot;
  plotId: number;
  price: number;
  quantity: number;
  measurementUnit: ProductionMeasurementUnit;
  executionDate: Date;
}

export enum ProductionMeasurementUnit {
  kg = 'kg',
  sc = 'sc',
  ton = 'ton',
}