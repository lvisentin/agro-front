import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { GetProductCategoriesQuery } from '@/shared/graphql/queries/GetProductCategories.query';
import { GetProductsQuery } from '@/shared/graphql/queries/GetProducts.query';
import { Plot } from '@/shared/models/plots/Plots.model';
import {
  Product,
  ProductMeasurementUnit,
} from '@/shared/models/products/Products.model';
import { useQuery } from '@apollo/client';
import { Formik } from 'formik';
import { useEffect } from 'react';
import CurrencyField from '../CurrencyInput/CurrencyField';
import DateInput from '../DateInput/DateInput';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import SelectField from '../SelectField/SelectField';
import TextField from '../TextField/TextField';
import { OperationFormProps } from './OperationForm.model';

function OperationForm({
  operation,
  cancelFunction,
  submitFunction,
  disabled,
  confirmBtn,
}: OperationFormProps) {
  useEffect(() => {
    console.log(operation);
  }, []);

  const { loading: getPlotsLoading, data: { plots } = {} } =
    useQuery(GetPlotsQuery);

  const { loading: categoriesLoading, data: { productCategories } = {} } =
    useQuery(GetProductCategoriesQuery);

  const { loading: getProductsLoading, data: { products } = {} } =
    useQuery(GetProductsQuery);

  return (
    <Formik
      initialValues={{
        description: operation ? operation?.description : '',
        plotId: operation ? operation?.plot?.id : 0,
        productId: operation ? operation?.product?.id : 0,
        quantity: operation ? operation?.quantity : 0,
        executionDate: operation ? operation.executionDate : new Date(),
        productCategory: operation ? operation?.product?.category?.id : 0,
        unitCost: operation ? operation?.product?.unitPrice : 0,
        hectareCost:
          operation && operation?.plot
            ? operation?.totalCost / operation?.plot?.size
            : '',
        plotCost:
          operation && operation?.plot && operation?.product
            ? operation?.plot?.size * operation?.product?.unitPrice
            : 0,
        measurementUnit: operation
          ? operation?.product?.measurementUnit
          : ProductMeasurementUnit.kg,
      }}
      onSubmit={(values) => submitFunction(values)}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        touched,
        errors,
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
            <TextField
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.description ? errors.description : null}
              disabled={disabled}
              name="description"
              placeholder="Digite o nome da operação"
              label="Operação"
            />

            <SelectField
              name="plotId"
              disabled={getPlotsLoading}
              options={plots?.length > 0 ? plots : []}
              value={values.plotId}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.plotId ? errors.plotId : null}
              placeholder="Selecione um talhão"
              label="Talhão"
            />

            <SelectField
              name="productId"
              disabled={getProductsLoading || !values.plotId}
              options={products?.length > 0 ? products : []}
              value={values.productId}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.productId ? errors.productId : null}
              placeholder="Selecione um produto"
              label="Produto"
            />

            <TextField
              value={values.quantity}
              onChange={($e) => {
                const selectedPlot = plots.find(
                  (curr: Plot) => curr.id === Number(values.plotId)
                );
                const selectedProduct = products.find(
                  (curr: Product) => curr.id === Number(values.productId)
                );
                
                setValues({
                  ...values,
                  productId: selectedProduct.id,
                  unitCost: selectedProduct.unitPrice,
                  measurementUnit: selectedProduct.measurementUnit,
                  productCategory: selectedProduct.category.id,
                  plotCost: selectedPlot.size * selectedProduct.unitPrice,
                  hectareCost:
                    ((+values.quantity * selectedProduct.unitPrice) /
                    selectedPlot.size).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}),
                  quantity: $e.target.value,
                });
              }}
              onBlur={handleBlur}
              errors={touched.quantity ? errors.quantity : null}
              disabled={disabled || !values.productId}
              name="quantity"
              type="number"
              placeholder="Digite a quantidade"
              label="Quantidade"
            />

            <DateInput
              value={values.executionDate}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.executionDate ? errors.executionDate : null}
              disabled={disabled}
              name="executionDate"
              placeholder="Data"
              label="Insira a data"
            />

            <TextField
              value={values.measurementUnit}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.measurementUnit ? errors.measurementUnit : null}
              disabled={true}
              name="measurementUnit"
              placeholder="Escolha uma unidade de medida"
              label="Unidade de medida"
            />

            <SelectField
              name="productCategory"
              options={productCategories}
              value={values.productCategory}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={true}
              errors={touched.productCategory ? errors.productCategory : null}
              placeholder="Selecione uma categoria"
              label="Categoria"
            />

            <CurrencyField
              value={values.unitCost}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.unitCost ? errors.unitCost : null}
              disabled={true}
              name="unitCost"
              placeholder="Custo unitário"
              label="Custo unitário"
            />

            <CurrencyField
              value={values.hectareCost}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.hectareCost ? errors.hectareCost : null}
              disabled={true}
              name="hectareCost"
              placeholder="Custo por ha"
              label="Custo por ha"
            />

            <CurrencyField
              value={values.plotCost}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.plotCost ? errors.plotCost : null}
              disabled={true}
              name="plotCost"
              placeholder="Custo por talhão"
              label="Custo por talhão"
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
