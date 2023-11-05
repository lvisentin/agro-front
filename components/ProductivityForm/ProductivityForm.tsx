import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import SelectField from '../SelectField/SelectField';
import { ProductivityFormProps } from "./ProductivityForm.model";

function ProductivityForm({
  productivity,
  submitFunction,
  cancelFunction,
}: ProductivityFormProps) {
  const { loading: getPlotsLoading, data: { plots } = {} } =
    useQuery(GetPlotsQuery);

  const formik = useFormik({
    initialValues: {
      plotId: productivity ?  productivity?.plot?.id : 0,
      marketPrice: productivity ? productivity.marketPrice : 0,
      quantity: productivity ? productivity.quantity : 0,
      unitPrice: productivity ? productivity.closedAt : 0,
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
