"use client";

import DataTable from "@/components/DataTable/DataTable";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";
import { Operation } from "@/shared/services/operations/Operations.model";
import { operationsService } from "@/shared/services/operations/OperationsService";
import { useQuery } from "react-query";

function OperationsPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["operations"],
    queryFn: () => operationsService.fetchOperationsList(),
  });

  const columns = [
    {
      field: "_id",
      name: "Código",
    },
    {
      field: "name",
      name: "Operação",
    },
    {
      field: "date",
      name: "Data",
    },
    {
      field: "product",
      name: "Produto",
    },
    {
      field: "costPerPlot",
      name: "Valor",
      transformData: (data: Operation) =>
        `${data.costPerPlot.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`,
    },
  ];

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="operations__wrapper">
      <div className="prose">
        <h2 className="prose-h2">Operações</h2>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default OperationsPage;
