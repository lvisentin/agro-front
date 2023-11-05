'use client';

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton/SecondaryButton";
import SelectField from "@/components/SelectField/SelectField";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { GetPlotsQuery } from "@/shared/graphql/queries/GetPlots.query";
import AnimatedPage from "@/shared/templates/AnimatedPage";
import { useQuery } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function ProductivityPage() {
  const { push } = useRouter();

  // useEffect(() => { TO DO: add api call when we get API
  //   refetch();
  // }, []);


  const [selectedPlot, setSelectedPlot] = useState(0);
  const {
    loading: getPlotsLoading,
    data: { plots } = {},
  } = useQuery(GetPlotsQuery, { notifyOnNetworkStatusChange: true });


  function clearFilter() {
    setSelectedPlot(0);
  }


  function goToNewProductivity() {
    push(PageRoutes.NewProductivity);
  }

  // const columns = [ TO DO: add correct columns when API is ready
  //   {
  //     field: 'id',
  //     name: 'Código',
  //   },
  //   {
  //     field: 'plot',
  //     name: 'Talhão',
  //   },
  //   {
  //     field: 'markedValue',
  //     name: 'Valor de mercado',
  //   },
  //   {
  //     field: 'quantity',
  //     name: 'Quantidade',
  //   },
  //   {
  //     field: '',
  //     name: 'Dia de fechamento',
  //     transformData: (data: Productiviy) => {
  //       return convertDateToGMT3(data.executionDate);
  //     },
  //   }
  // ];

  

  return (
    <AnimatedPage>
      <div className="productivity_wrapper">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Produtividade</h2>

          <PrimaryButton onClick={goToNewProductivity}>
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

        <div className="filter">
          <div className="flex items-center gap-4">
            {/* <SelectField
              name="Productivities"
            ></SelectField> */}
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}

export default ProductivityPage;
