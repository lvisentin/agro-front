import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { ProductivityMeasurementUnit } from '@/shared/models/productivity/Productivity.model';
import { getEnumValues, translateMeasurementUnit } from '@/shared/utils/getEnumValues';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import CurrencyField from '../CurrencyInput/CurrencyField';
import DateInput from '../DateInput/DateInput';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import SelectField from '../SelectField/SelectField';
import { SelectOption } from '../SelectField/SelectField.model';
import TextField from '../TextField/TextField';
import { ProductivityFormProps } from "./ProductivityForm.model";

function ProductivityForm({
  productivity,
  submitFunction,
  cancelFunction,
}: ProductivityFormProps) {
  const { loading: getPlotsLoading, data: { plots } = {} } =
    useQuery(GetPlotsQuery);

  const measurementUnits: SelectOption[] = getEnumValues(
    ProductivityMeasurementUnit
  ).map(
    (unit, i) =>
      ({ id: unit, name: translateMeasurementUnit(unit) }) as SelectOption
  );

  const formik = useFormik({
    initialValues: {
      plotId: productivity ?  productivity?.plot?.id : 0,
      marketPrice: productivity ? productivity.marketPrice : 0,
      quantity: productivity ? productivity.quantity : 0,
      measurementUnit: productivity ? productivity.measurementUnit : 0,
      closedAt: productivity ? productivity.closedAt : new Date()
    },
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
          value={formik.values.marketPrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.marketPrice ? formik.errors.marketPrice : null}
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
          value={formik.values.closedAt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.closedAt ? formik.errors.closedAt : null
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
          {productivity ? 'Fechar' : 'Cancelar'}
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

export default ProductivityForm;
