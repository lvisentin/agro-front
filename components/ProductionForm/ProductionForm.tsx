import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { ProductionMeasurementUnit } from '@/shared/models/production/Production.model';
import { getEnumValues, translateMeasurementUnit } from '@/shared/utils/getEnumValues';
import { newProductionValidationSchema } from '@/shared/validationSchemas/NewProduction.schema';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import CurrencyField from '../CurrencyInput/CurrencyField';
import DateInput from '../DateInput/DateInput';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import SelectField from '../SelectField/SelectField';
import { SelectOption } from '../SelectField/SelectField.model';
import TextField from '../TextField/TextField';
import { ProductionFormProps } from "./ProductionForm.model";

function ProductionForm({
  production,
  submitFunction,
  cancelFunction,
  loading
}: ProductionFormProps) {
  const { loading: getPlotsLoading, data: { plots } = {} } =
    useQuery(GetPlotsQuery);

  const measurementUnits: SelectOption[] = getEnumValues(
    ProductionMeasurementUnit
  ).map(
    (unit, i) =>
      ({ id: unit, name: translateMeasurementUnit(unit) }) as SelectOption
  );

  const formik = useFormik({
    initialValues: {
      plotId: production ? production.plotId : 0,
      description: production ? production.description : '',
      price: production
        ? production?.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        : '',
      quantity: production ? production.quantity : 0,
      measurementUnit: production ? production?.measurementUnit : ProductionMeasurementUnit.kg,
      executionDate: production ? production.executionDate : new Date()
    },
    validationSchema: newProductionValidationSchema,
    onSubmit: (values) => submitFunction(values)
  })

  useEffect(() => {
    if (production) {
      formik.setValues({
        plotId: production?.plotId,
        description: production?.description,
        price: production?.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        quantity: production?.quantity,
        measurementUnit: production?.measurementUnit,
        executionDate: production.executionDate
      })


      const setExecutionDate = () => {
        const executionDateInput = document.getElementById('executionDateInput') as HTMLInputElement;
  
        if (executionDateInput) {
          executionDateInput.valueAsDate = new Date(production.executionDate);
        } else {
          requestAnimationFrame(setExecutionDate);
        }
      };
  
      setExecutionDate();
    }

  }, [production])

  const isSubmitDisabled = formik.values.quantity <= 0 || !formik.dirty || !formik.isValid || getPlotsLoading;

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
        <SelectField
          name="plotId"
          disabled={getPlotsLoading || loading}
          options={plots?.length > 0 ? plots : []}
          value={formik.values.plotId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.plotId ? formik.errors.plotId : null}
          placeholder="Selecione um talhão"
          label="Talhão"
        />

        <TextField
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.description
            ? formik.errors.description
            : null
          }
          disabled={loading}
          name="description"
          type="textarea"
          placeholder="Descrição"
          label="Descrição"
        />

        <CurrencyField
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.price ? formik.errors.price : null}
          disabled={loading}
          
          name="price"
          placeholder="Valor de mercado"
          label="Valor de mercado"
        />

        <TextField
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.quantity
              ? formik.errors.quantity
              : null
          }
          disabled={loading}
          type="number"
          name="quantity"
          placeholder="Quantidade"
          label="Quantidade"
        />

        <SelectField
          name="measurementUnit"
          disabled={loading}
          options={measurementUnits}
          value={formik.values.measurementUnit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.measurementUnit ? formik.errors.measurementUnit : null}
          placeholder="Selecione uma unidade de medida"
          label="Unidade de medida"
        />


        <DateInput
          value={formik.values.executionDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.executionDate ? formik.errors.executionDate : null
          }
          disabled={loading}
          name="executionDate"
          placeholder="Data de fechamento"
          label="Insira a data"
          id="executionDateInput"
        />
      </div>

      <div className="card-footer flex items-center justify-end p-4">
        <SecondaryButton
          type="button"
          onClick={cancelFunction}
          className="mr-3"
        >
          {production ? 'Fechar' : 'Cancelar'}
        </SecondaryButton>

        <PrimaryButton
          type="submit"
          disabled={isSubmitDisabled}
          onClick={formik.handleSubmit}
        >
          Salvar
        </PrimaryButton>
      </div>
    </form>
  )
}

export default ProductionForm;
