import { DataTableProps } from "./DataTable.model";
import styles from "./DataTable.module.scss";

export default function DataTable({
  data,
  columns,
  actionButtons,
}: DataTableProps) {
  return (
    <table
      className={"table w-full rounded-md border-spacing-y-3 border-separate"}
    >
      <thead>
        <tr>
          {columns.length > 0 &&
            columns.map((column, key) => (
              <th
                className={"text-left"}
                key={key}
                id={`table-header-${column.field}`}
              >
                {column.name}
              </th>
            ))}
        </tr>
      </thead>

      <tbody>
        {data.length > 0 &&
          data.map((row, key) => (
            <tr
              id={`table-body-row-${key}`}
              className={`bg-white rounded-md hover ${styles.tr}`}
              key={key}
            >
              {Object.keys(row).map((column, key) => (
                <td className={`${styles.td} py-4 px-4`} key={key}>
                  {row[column]}
                </td>
              ))}
              {actionButtons && <td>{actionButtons}</td>}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
