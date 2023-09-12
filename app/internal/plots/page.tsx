"use client";

import DataTable from "@/components/DataTable/DataTable";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";
import { Plot } from "@/shared/services/plots/Plots.model";
import { plotsService } from "@/shared/services/plots/PlotsService";
import { useQuery } from "react-query";

function PlotsPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["plots"],
    queryFn: () => plotsService.fetchPlotsList(),
  });

  const columns = [
    {
      field: "_id",
      name: "Código",
    },
    {
      field: "name",
      name: "Nome",
    },
    {
      field: "category",
      name: "Categoria",
    },
    {
      field: "size",
      name: "Tamanho",
      transformData: (data: Plot) => `${data.size}ha`,
    },
  ];

  const actionButtons = (
    <div className={`action__buttons flex items-center justify-end`}>
      <EditButton onClick={() => console.log("edit")} />
      <DeleteButton onClick={() => console.log("edit")} className="ml-2" />
    </div>
  );

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="plots__wrapper">
      <div className="prose">
        <h2 className="prose-h2">Talhões</h2>
      </div>
      <DataTable data={data} columns={columns} actionButtons={actionButtons} />
    </div>
  );
}

export default PlotsPage;
