import { Formik } from 'formik';
import DateInput from '../DateInput/DateInput';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import TextField from '../TextField/TextField';
import { OperationFormProps } from './OperationForm.model';

function OperationForm({
  operation,
  cancelFunction,
  submitFunction,
  disabled,
  confirmBtn,
}: OperationFormProps) {
  return (
    <Formik
      initialValues={{
        name: operation ? operation.name : '',
        plot: operation ? operation.plot : '',
        product: operation ? operation.product : '',
        dose: operation ? operation.dose : 0,
        unity: operation ? operation.unity : 0,
        productType: operation ? operation.productType : '',
        unityCost: operation ? operation.unityCost : 0,
        costPerHa: operation ? operation.costPerHa : 0,
        costPerPlot: operation ? operation.costPerPlot : 0,
        date: operation ? operation.date : '',
      }}
      onSubmit={(values) => submitFunction(values)}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
            <TextField
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.name ? errors.name : null}
              disabled={disabled}
              name="name"
              placeholder="Digite o nome da operação"
              label="Operação"
            />

            <TextField
              value={values.plot}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.plot ? errors.plot : null}
              disabled={disabled}
              name="plot"
              placeholder="Digite o nome do talhão"
              label="Talhão"
            />

            <TextField
              value={values.product}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.product ? errors.product : null}
              disabled={disabled}
              name="product"
              placeholder="Digite o nome do produto"
              label="Produto"
            />

            <TextField
              value={values.dose}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.dose ? errors.dose : null}
              disabled={disabled}
              name="dose"
              placeholder="Digite o nome do produto"
              label="Dose/ha"
            />

            <TextField
              value={values.unity}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.unity ? errors.unity : null}
              disabled={disabled}
              name="unity"
              placeholder="Digite a unidade"
              label="Unidade por medida"
            />

            <TextField
              value={values.productType}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.productType ? errors.productType : null}
              disabled={disabled}
              name="productType"
              placeholder="Digite o tipo de produto"
              label="Tipo de produto"
            />

            <TextField
              value={values.unityCost}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.unityCost ? errors.unityCost : null}
              disabled={disabled}
              name="unityCost"
              placeholder="Digite o custo unitário"
              label="Custo unitário"
            />

            <TextField
              value={values.costPerHa}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.costPerHa ? errors.costPerHa : null}
              disabled={disabled}
              name="costPerHa"
              placeholder="Digite o custo por ha"
              label="Custo por ha"
            />

            <TextField
              value={values.costPerPlot}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.costPerPlot ? errors.costPerPlot : null}
              disabled={disabled}
              name="costPerPlot"
              placeholder="Digite o custo por talhão"
              label="Custo por talhão"
            />

            <DateInput
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.date ? errors.date : null}
              disabled={disabled}
              name="date"
              placeholder="Data"
              label="Insira a data"
            />
          </div>

          <div className="card-footer flex items-center justify-end p-4">
            <SecondaryButton
              type="button"
              onClick={cancelFunction}
              className="mr-3"
            >
              Cancelar
            </SecondaryButton>

            <PrimaryButton type="submit" onClick={handleSubmit}>
              {confirmBtn}
            </PrimaryButton>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default OperationForm;
