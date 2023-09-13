"use client";

import DataTable from "@/components/DataTable/DataTable";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { productsService } from "@/shared/services/products/ProductsService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

function SupplyPage() {
  const { push } = useRouter();
  
  function goToNewPage() {
    push(PageRoutes.NewProduct);
  }

  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.fetchProductsList(),
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
      field: "quantity",
      name: "Qtd em estoque",
    },
    {
      field: "minQuantity",
      name: "Qtd mínima em estoque",
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
    <div className="supply__wrapper">
      <div className="prose flex justify-between w-full max-w-full">
        <h2 className="prose-h2">Estoque</h2>

        <PrimaryButton onClick={goToNewPage}>
          <FontAwesomeIcon icon={faPlus} />
          Novo produto
        </PrimaryButton>
      </div>
      <DataTable data={data} columns={columns} actionButtons={actionButtons} />
    </div>
  );
}

export default SupplyPage;
