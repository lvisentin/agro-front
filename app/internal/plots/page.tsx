"use client";

import DataTable from "@/components/DataTable/DataTable";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { Plot } from "@/shared/services/plots/Plots.model";
import { plotsService } from "@/shared/services/plots/PlotsService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

function PlotsPage() {
  const { push } = useRouter();

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

  function goToNewPlot() {
    push(PageRoutes.NewPlot);
  }

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="plots__wrapper">
      <div className="prose flex justify-between w-full max-w-full">
        <h2 className="prose-h2">Talhões</h2>

        <PrimaryButton onClick={goToNewPlot}>
          <FontAwesomeIcon icon={faPlus} />
          Novo talhão
        </PrimaryButton>
      </div>

      <DataTable data={data} columns={columns} />
    </div>
  );
}

export default PlotsPage;
