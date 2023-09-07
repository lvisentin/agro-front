export interface DataTableProps {
  data: any[];
  columns: TableColumn[];
}

export interface TableColumn {
  field: string;
  name: string;
  canEdit?: boolean;
}
