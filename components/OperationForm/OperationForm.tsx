import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { GetProductCategoriesQuery } from '@/shared/graphql/queries/GetProductCategories.query';
import { GetProductsQuery } from '@/shared/graphql/queries/GetProducts.query';
import { Plot } from '@/shared/models/plots/Plots.model';
import {
  Product,
  ProductMeasurementUnit,
} from '@/shared/models/products/Products.model';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
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
  loading: propLoading,
  confirmBtn,
}: OperationFormProps) {
  const { loading: getPlotsLoading, data: { plots } = {} } =
    useQuery(GetPlotsQuery);

  const { loading: categoriesLoading, data: { productCategories } = {} } =
    useQuery(GetProductCategoriesQuery);

  const { loading: getProductsLoading, data: { products } = {} } =
    useQuery(GetProductsQuery);

  const formik = useFormik({
    initialValues: {
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
    },
    onSubmit: (values) => {
      if (submitFunction) {
        submitFunction(values);
      }
    },
  });

  useEffect(() => {
    console.log('operation', operation);
    if (operation) {
      formik.setValues({
        description: operation?.description,
        plotId: operation?.plot?.id,
        productId: operation?.product?.id,
        quantity: operation?.quantity,
        executionDate: operation.executionDate,
        productCategory: operation?.product?.category?.id,
        unitCost: operation?.product?.unitPrice,
        hectareCost: operation?.plot
          ? operation?.totalCost / operation?.plot?.size
          : 0,
        plotCost:
          operation?.plot && operation?.product
            ? operation?.plot?.size * operation?.product?.unitPrice
            : 0,
        measurementUnit: operation?.product?.measurementUnit,
      });
    }
  }, [operation]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
        <TextField
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.description ? formik.errors.description : null}
          disabled={disabled || !!operation || propLoading}
          name="description"
          placeholder="Digite o nome da operação"
          label="Operação"
        />

        <SelectField
          name="plotId"
          disabled={getPlotsLoading || !!operation || propLoading}
          options={plots?.length > 0 ? plots : []}
          value={formik.values.plotId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.plotId ? formik.errors.plotId : null}
          placeholder="Selecione um talhão"
          label="Talhão"
        />

        <SelectField
          name="productId"
          disabled={getProductsLoading || !formik.values.plotId || !!operation || propLoading}
          options={products?.length > 0 ? products : []}
          value={formik.values.productId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.productId ? formik.errors.productId : null}
          placeholder="Selecione um produto"
          label="Produto"
        />

        <TextField
          value={formik.values.quantity}
          onChange={($e) => {
            const selectedPlot = plots.find(
              (curr: Plot) => curr.id === Number(formik.values.plotId)
            );
            const selectedProduct = products.find(
              (curr: Product) => curr.id === Number(formik.values.productId)
            );

            formik.setValues({
              ...formik.values,
              productId: selectedProduct.id,
              unitCost: selectedProduct.unitPrice,
              measurementUnit: selectedProduct.measurementUnit,
              productCategory: selectedProduct.category.id,
              plotCost: selectedPlot.size * selectedProduct.unitPrice,
              hectareCost: (
                (+formik.values.quantity * selectedProduct.unitPrice) /
                selectedPlot.size
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }),
              quantity: $e.target.value,
            });
          }}
          onBlur={formik.handleBlur}
          errors={formik.touched.quantity ? formik.errors.quantity : null}
          disabled={disabled || !formik.values.productId || propLoading}
          name="quantity"
          type="number"
          placeholder="Digite a quantidade"
          label="Quantidade"
        />

        <DateInput
          value={formik.values.executionDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.executionDate ? formik.errors.executionDate : null
          }
          disabled={disabled || propLoading}
          name="executionDate"
          placeholder="Data"
          label="Insira a data"
        />

        <TextField
          value={formik.values.measurementUnit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.measurementUnit
              ? formik.errors.measurementUnit
              : null
          }
          disabled={true}
          name="measurementUnit"
          placeholder="Escolha uma unidade de medida"
          label="Unidade de medida"
        />

        <SelectField
          name="productCategory"
          options={productCategories}
          value={formik.values.productCategory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={true}
          errors={
            formik.touched.productCategory
              ? formik.errors.productCategory
              : null
          }
          placeholder="Selecione uma categoria"
          label="Categoria"
        />

        <CurrencyField
          value={formik.values.unitCost}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.unitCost ? formik.errors.unitCost : null}
          disabled={true}
          name="unitCost"
          placeholder="Custo unitário"
          label="Custo unitário"
        />

        <CurrencyField
          value={formik.values.hectareCost}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.hectareCost ? formik.errors.hectareCost : null}
          disabled={true}
          name="hectareCost"
          placeholder="Custo por ha"
          label="Custo por ha"
        />

        <CurrencyField
          value={formik.values.plotCost}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.plotCost ? formik.errors.plotCost : null}
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
          {operation ? 'Fechar' : 'Cancelar'}
        </SecondaryButton>

        {submitFunction && (
          <PrimaryButton type="submit" onClick={formik.handleSubmit}>
            {confirmBtn}
          </PrimaryButton>
        )}
      </div>
    </form>
  );
}

export default OperationForm;
