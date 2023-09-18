'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { Property } from '@/shared/services/properties/Properties.model';
import { useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function PropertiesPage() {
  const { push } = useRouter();
  const {
    loading,
    error,
    data: { properties } = {},
  } = useQuery(GetPropertiesQuery);

  const columns = [
    {
      field: 'id',
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
    push(`${PageRoutes.NewProperty}/${property.id}`);
  }

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    toast.error('Ocorreu um erro, tente novamente');
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
