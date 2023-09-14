"use client";

import DataTable from "@/components/DataTable/DataTable";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";
import { Sale } from "@/shared/services/sales/Sales.model";
import { salesService } from "@/shared/services/sales/SalesService";
import { useQuery } from "react-query";

function SalesPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["sales"],
    queryFn: () => salesService.fetchSalesList(),
  });

  const columns = [
    {
      field: "description",
      name: "Descrição",
    },
    {
      field: "category",
      name: "Categoria",
    },
    {
      field: "total",
      name: "Valor",
      transformData: (data: Sale) =>
        `${data.total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`,
    },
  ];


  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="sales__wrapper">
      <div className="prose">
        <h2 className="prose-h2">Vendas</h2>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default SalesPage;
