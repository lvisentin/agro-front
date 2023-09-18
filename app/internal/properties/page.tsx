'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { Property } from '@/shared/services/properties/Properties.model';
import { propertiesService } from '@/shared/services/properties/PropertiesService';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

function PropertiesPage() {
  const { push } = useRouter();

  const { isLoading, data: { properties } = {} } = useQuery({
    queryKey: ['properties'],
    queryFn: () => propertiesService.getProperties(),
  }, {refetchOnMount: false});

  const columns = [
    {
      field: '_id',
      name: 'Código',
    },
    {
      field: 'name',
      name: 'Nome',
    },
    {
      field: 'size',
      name: 'Tamanho da propriedade',
      transformData: (data: Property) => `${data.size}ha`,
    },
    {
      field: 'description',
      name: 'Descrição',
    },
  ];

  function deleteProperty(property: Property) {
    console.log('property', property);
  }

  function goToNewProperty() {
    push(PageRoutes.NewProperty);
  }

  function goToEdit(property: Property) {
    push(`${PageRoutes.NewProperty}/${property._id}`);
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
      {properties?.length > 0 ? (
        <DataTable
          data={properties}
          columns={columns}
          handleEditClick={goToEdit}
          handleDeleteClick={deleteProperty}
        />
      ) : (
        <NoData message={'Não encontramos nenhuma propriedade cadastrada'} />
      )}
    </div>
  );
}

export default PropertiesPage;
