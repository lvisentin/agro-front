import { DataTableProps } from "./DataTable.model";

export default function DataTable({ data, columns }: DataTableProps) {
  return (
    <table className={"table w-full"}>
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
            <tr id={`table-body-row-${key}`} className="hover" key={key}>
              {Object.keys(row).map((column, key) => (
                <td key={key}>{row[column]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
