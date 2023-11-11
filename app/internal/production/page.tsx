'use client';

import DataTable from "@/components/DataTable/DataTable";
import NoData from "@/components/NoData/NoData";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton/SecondaryButton";
import SelectField from "@/components/SelectField/SelectField";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { GetPlotsQuery } from "@/shared/graphql/queries/GetPlots.query";
import { GetProductionQuery } from "@/shared/graphql/queries/GetProduction.query";
import { Production } from "@/shared/models/production/Production.model";
import AnimatedPage from "@/shared/templates/AnimatedPage";
import convertDateToGMT3 from "@/shared/utils/convertDateToGMT3";
import { useQuery } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

function ProductionPage() {
  const { push } = useRouter();

  const {
    loading,
    error,
    data: { productions } = {},
    refetch,
  } = useQuery(GetProductionQuery, {notifyOnNetworkStatusChange: true});

  useEffect(() => {
    refetch();
  }, []);


  const [selectedPlot, setSelectedPlot] = useState(0);
  const {
    loading: getPlotsLoading,
    data: { plots } = {},
  } = useQuery(GetPlotsQuery, { notifyOnNetworkStatusChange: true });


  function clearFilter() {
    setSelectedPlot(0);
  }


  function goToNewProduction() {
    push(PageRoutes.NewProduction);
  }

  const columns = [
    {
      field: 'id',
      name: 'Código',
    },
    {
      field: 'plotId',
      name: 'Talhão',
    },
    {
      field: 'price',
      name: 'Valor de mercado',
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

  function goToEdit () {
    console.log('edit');
  }

  function handleDelete () {
    console.log('handleDelete');
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
