import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { ProductionMeasurementUnit } from '@/shared/models/production/Production.model';
import { getEnumValues, translateMeasurementUnit } from '@/shared/utils/getEnumValues';
import { newProductionValidationSchema } from '@/shared/validationSchemas/NewProduction.schema';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
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
      plotId: production ?  production?.plot?.id : 0,
      price: production ? production.price : 0,
      quantity: production ? production.quantity : 0,
      measurementUnit: production ? production.measurementUnit : 0,
      executionDate: production ? production.executionDate : new Date()
    },
    validationSchema: newProductionValidationSchema,
    onSubmit: (values) => submitFunction(values)
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
        <SelectField
          name="plotId"
          disabled={getPlotsLoading}
          options={plots?.length > 0 ? plots : []}
          value={formik.values.plotId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.plotId ? formik.errors.plotId : null}
          placeholder="Selecione um talhão"
          label="Talhão"
        />
        <CurrencyField
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.price ? formik.errors.price : null}
          name="marketPrice"
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
          type="number"
          name="quantity"
          placeholder="Quantidade"
          label="Quantidade"
        />

        <SelectField
          name="measurementUnit"
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
          name="closedAt"
          placeholder="Data de fechamento"
          label="Insira a data"
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
          onClick={formik.handleSubmit}
        >
          Salvar
        </PrimaryButton>
      </div>
    </form>
  )
}

export default ProductionForm;
