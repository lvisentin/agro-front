import Swal from 'sweetalert2';
import DeleteButton from '../DeleteButton/DeleteButton';
import DetailsButton from '../DetailsButton/DetailsButton';
import EditButton from '../EditButton/EditButton';
import { DataTableProps } from './DataTable.model';
import styles from './DataTable.module.scss';

export default function DataTable({
  data,
  columns,
  handleEditClick,
  handleDeleteClick,
  handlePreviewClick,
}: DataTableProps) {
  function confirmDelete(row: any) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Gostaria de excluir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && handleDeleteClick) {
        handleDeleteClick(row);
      }
    });
  }

  return (
    <table
      className={'table w-full rounded-md border-spacing-y-3 border-separate'}
    >
      <thead>
        <tr>
          {columns.length > 0 &&
            columns.map((column, key) => (
              <th
                className={'text-left'}
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
              {columns.map((column, key) => {
                if (!column.transformData) {
                  return <td key={key}>{row[column.field]}</td>;
                }

                return <td key={key}> {column.transformData(row)}</td>;
              })}

              <td className={`${styles.td} px-4`}>
                <div
                  className={`action__buttons flex items-center justify-end`}
                >
                  {handleEditClick && (
                    <EditButton
                      className={`${styles.buttons}`}
                      onClick={() => handleEditClick(row)}
                      key={'edit'}
                    />
                  )}

                  {handlePreviewClick && (
                    <DetailsButton
                      className={`${styles.buttons} ml-2`}
                      onClick={() => handlePreviewClick(row)}
                      key={'details'}
                    />
                  )}

                  {handleDeleteClick && (
                    <DeleteButton
                      className={`${styles.buttons} ml-2`}
                      onClick={() => confirmDelete(row)}
                      key={'delete'}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
