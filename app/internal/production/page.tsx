'use client';

import DataTable from "@/components/DataTable/DataTable";
import NoData from "@/components/NoData/NoData";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton/SecondaryButton";
import SelectField from "@/components/SelectField/SelectField";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { DeleteProductionMutation } from "@/shared/graphql/mutations/DeleteProduction.mutation";
import { GetPlotsQuery } from "@/shared/graphql/queries/GetPlots.query";
import { GetProductionQuery } from "@/shared/graphql/queries/GetProduction.query";
import { Production } from "@/shared/models/production/Production.model";
import AnimatedPage from "@/shared/templates/AnimatedPage";
import convertDateToGMT3 from "@/shared/utils/convertDateToGMT3";
import { useMutation, useQuery } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductionPage() {
  const { push } = useRouter();
  const [selectedPlot, setSelectedPlot] = useState(0);
  const [deleteProduction] = useMutation(DeleteProductionMutation);

  const {
    loading,
    error,
    data: { productions } = {},
    refetch,
  } = useQuery(GetProductionQuery, {notifyOnNetworkStatusChange: true});

  const {
    loading: getPlotsLoading,
    data: { plots } = {},
  } = useQuery(GetPlotsQuery, { notifyOnNetworkStatusChange: true });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!selectedPlot) {
      refetch({ plotId: undefined });
      return;
    }

    refetch({
      plotId: Number(selectedPlot),
    });
  }, [selectedPlot, refetch]);


  function clearFilter() {
    setSelectedPlot(0);
  }


  function goToNewProduction() {
    push(PageRoutes.NewProduction);
  }

  const columns = [
    {
      field: 'plotId',
      name: 'Talhão',
      transformData : (data: Production) => data.plot?.name,

    },
    {
      field: 'description',
      name: 'Descrição'
    },
    {
      field: 'price',
      name: 'Valor de mercado',
      transformData: (data: Production) =>
        `${data.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
    {
      field: 'quantity',
      name: 'Quantidade',
    },
    {
      field: 'measurementUnit',
      name: 'Tipo de item',
    },
    {
      field: 'executionDate',
      name: 'Dia de fechamento',
      transformData: (data: Production) => {
        return convertDateToGMT3(data.executionDate);
      },
    }
  ];

  function goToEdit (productions: Production ) {
    push(`${PageRoutes.NewProduction}/${productions.id}`);
  }

  function handleDelete(production: Production) {
    deleteProduction({ variables: { id: production.id } })
      .then(() => {
        toast.success('Produtividade deletada com sucesso', {
          containerId: 'default',
        });
        refetch();
      })
      .catch(() =>
        toast.error('Ocorreu um erro, tente novamente', {
          containerId: 'default',
        })
      );
  }

  return (
    <AnimatedPage>
      <div className="production_wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Produtividade</h2>

          <PrimaryButton onClick={goToNewProduction}>
              <FontAwesomeIcon icon={faPlus} />
              Novo relatório
          </PrimaryButton>
        </div>

        <div className="filter">
          <div className="flex items-center gap-4">
            <SelectField
              name="plot"
              options={plots}
              value={selectedPlot}
              onChange={(e) => {
                setSelectedPlot(e.target.value);
              }}
              disabled={getPlotsLoading}
              placeholder="Selecione um talhão"
              label="Filtrar por talhão"
            />

            <SecondaryButton
              type="button"
              onClick={clearFilter}
              className="mt-4"
            >
              Limpar filtro
            </SecondaryButton>
          </div>
        </div>

        {loading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : productions?.length > 0 ? (
          <DataTable
            data={productions}
            columns={columns}
            handleEditClick={goToEdit}
            handleDeleteClick={handleDelete}
          />
        ) : (
          <NoData message={'Não encontramos nenhum talhão cadastrada'} />
        )}
      </div>
    </AnimatedPage>
  )
}

export default ProductionPage;
