'use client';

import DataTable from '@/components/DataTable/DataTable';
import NoData from '@/components/NoData/NoData';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { DeletePropertyMutation } from '@/shared/graphql/mutations/DeleteProperty.mutation';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { Property } from '@/shared/models/properties/Properties.model';
import { useMutation, useQuery } from '@apollo/client';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function PropertiesPage() {
  const { push } = useRouter();

  const {
    loading,
    error,
    data: { properties } = {},
    refetch,
  } = useQuery(GetPropertiesQuery);

  useEffect(() => {
    refetch();
  }, []);

  const [deleteProperty] = useMutation(DeletePropertyMutation);

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
      field: 'description',
      name: 'Descrição',
    },
    {
      field: 'size',
      name: 'Tamanho da propriedade',
      transformData: (data: Property) => `${data.size}ha`,
    },
  ];

  function handleDelete(property: Property) {
    console.log('property', property);
    deleteProperty({ variables: { id: property.id } }).then(() => {
      toast.success('Propriedade deletada com sucesso!');
      refetch();
    });
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
          handleDeleteClick={handleDelete}
        />
      ) : (
        <NoData message={'Não encontramos nenhuma propriedade cadastrada'} />
      )}
    </div>
  );
}

export default PropertiesPage;
