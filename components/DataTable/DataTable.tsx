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
              {Object.keys(row).map((column: string, key) => {
                const currentColumn = columns.find((cc) => cc.field === column);
                return (
                  <td className={`${styles.td} py-4 px-4`} key={key}>
                    {currentColumn?.transformData
                      ? currentColumn.transformData(row)
                      : row[column]}
                  </td>
                );
              })}
              {actionButtons && <td className={`${styles.td} py-4 px-4`}>{actionButtons}</td>}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
