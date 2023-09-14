import { ReactElement } from "react";

export interface DataTableProps {
  data: any[];
  columns: TableColumn[];
  actionButtons?: ReactElement[];
  handleEditClick?: (params?: any) => any
}

export interface TableColumn {
  field: string;
  name: string;
  transformData?: (data: any) => any
}
