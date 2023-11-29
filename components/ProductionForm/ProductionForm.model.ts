import { Production } from "@/shared/models/production/Production.model";

export interface ProductionFormProps {
  production?: Production;
  submitFunction: (values: any) => void;
  cancelFunction: () => void;
  loading?: boolean;
}
