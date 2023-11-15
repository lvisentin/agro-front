import { Report } from "@/shared/models/reports/reports.model";

export interface ReportFormProps {
  report?: Report;
  submitFunction: (values: any) => void;
  loading?: boolean;
}
