"use client";

import DataTable from "@/components/DataTable/DataTable";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";
import { Product } from "@/shared/services/products/Products.model";
import { productsService } from "@/shared/services/products/ProductsService";
import React, { useState } from "react";
import { useQuery } from "react-query";

function SupplyPage() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.fetchProductsList(),
  });

  const columns = [
    {
      field: "id",
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
    <div className={`action__buttons`}>
      <EditButton onClick={() => console.log("edit")} />
      <DeleteButton onClick={() => console.log("edit")} className="ml-2" />
    </div>
  );

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="supply__wrapper">
      <div className="prose">
        <h2 className="prose-h2">Estoque</h2>
      </div>
      <DataTable data={data} columns={columns} actionButtons={actionButtons} />
    </div>
  );
}

export default SupplyPage;
