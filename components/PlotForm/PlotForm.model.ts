import { Plot } from '@/shared/models/plots/Plots.model';

export interface PlotFormProps {
  plot?: Plot;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
  loading?: boolean;
}
