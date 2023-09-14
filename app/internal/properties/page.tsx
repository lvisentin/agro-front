"use client";

import DataTable from "@/components/DataTable/DataTable";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { Property } from "@/shared/services/properties/Properties.model";
import { propertiesService } from "@/shared/services/properties/PropertiesService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

function PropertiesPage() {
  const { push } = useRouter();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["properties"],
    queryFn: () => propertiesService.fetchPropertiesList(),
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
  ];

  function goToNewProperty() {
    push(PageRoutes.NewProperty);
  }

  function editProperty(property: Property) {
    push(`${PageRoutes.NewProperty}?id=${property._id}`);
  }

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="properties__wrapper">
      <div className="prose flex justify-between w-full max-w-full">
        <h2 className="prose-h2">Propriedades</h2>

        <PrimaryButton onClick={goToNewProperty}>
          <FontAwesomeIcon icon={faPlus} />
          Nova propriedade
        </PrimaryButton>
      </div>
      <DataTable data={data} columns={columns} handleEditClick={editProperty} />
    </div>
  );
}

export default PropertiesPage;
