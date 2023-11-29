import { GetPlotsQuery } from '@/shared/graphql/queries/GetPlots.query';
import { GetProductCategoriesQuery } from '@/shared/graphql/queries/GetProductCategories.query';
import { GetProductsQuery } from '@/shared/graphql/queries/GetProducts.query';
import { Plot } from '@/shared/models/plots/Plots.model';
import {
  Product,
  ProductMeasurementUnit,
} from '@/shared/models/products/Products.model';
import { newOperationValidationSchema } from '@/shared/validationSchemas/NewOperation.schema';
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

  const {
    loading: getProductsLoading,
    data: { products } = {},
    refetch: refetchProducts,
  } = useQuery(GetProductsQuery, {
    variables: { propertyId: undefined },
    notifyOnNetworkStatusChange: true,
  });

  const formik = useFormik({
    initialValues: {
      description: operation ? operation?.description : '',
      plotId: operation ? operation?.plot?.id : 0,
      productId: operation ? operation?.product?.id : 0,
      dosePerHecatare: operation ? operation?.dosePerHecatare : 0,
      executionDate: operation ? operation.executionDate : new Date(),
      productCategory: operation ? operation?.product?.category?.id : 0,
      unitCost: operation
        ? operation?.product?.unitPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        : 0,
      hectareCost:
        operation && operation?.plot
          ? operation?.dosePerHecatare * operation?.product?.unitPrice!
          : '',
      plotCost:
        operation && operation?.plot && operation?.product
          ? operation?.plot?.size * operation?.dosePerHecatare
          : '',
      measurementUnit: operation
        ? operation?.product?.measurementUnit
        : ProductMeasurementUnit.kg,
    },
    validationSchema: newOperationValidationSchema,
    onSubmit: (values) => {
      if (submitFunction) {
        submitFunction(values);
      }
    },
  });

  useEffect(() => {
    if (operation) {
      formik.setValues({
        description: operation?.description,
        plotId: operation?.plot?.id,
        productId: operation?.product?.id,
        dosePerHecatare: operation?.dosePerHecatare,
        executionDate: operation.executionDate,
        productCategory: operation?.product?.category?.id,
        unitCost: operation?.product?.unitPrice.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        hectareCost: operation?.plot
          ? (
              operation?.dosePerHecatare * operation?.product?.unitPrice!
            ).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })
          : 0,
        plotCost:
          operation?.plot && operation?.product
            ? (
                operation?.plot?.size *
                (operation?.dosePerHecatare * operation?.product.unitPrice)
              ).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            : '',
        measurementUnit: operation?.product?.measurementUnit,
      });

      setTimeout(() => {
        (document.getElementById('executionDateInput') as any).valueAsDate =
          new Date(operation.executionDate);
      }, 100);
    }
  }, [operation]);

  const isSubmitDisabled = formik.values.dosePerHecatare <= 0 || !formik.dirty || !formik.isValid || propLoading;

  function calculateQuantity($e: any) {
    const selectedPlot = plots.find(
      (curr: Plot) => curr.id === Number(formik.values.plotId)
    );
    const selectedProduct = products.find(
      (curr: Product) => curr.id === Number(formik.values.productId)
    );

    formik.setValues({
      ...formik.values,
      productId: selectedProduct.id,
      unitCost: selectedProduct.unitPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      measurementUnit: selectedProduct.measurementUnit,
      productCategory: selectedProduct.category.id,
      plotCost: (
        selectedPlot.size *
        (+$e.target.value * selectedProduct.unitPrice)
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      hectareCost: (
        (+$e.target.value || 0) * selectedProduct.unitPrice
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      dosePerHecatare: $e.target.value,
    });
  }

  function changeProduct($e: any) {
    const selectedPlot = plots.find(
      (curr: Plot) => curr.id === Number(formik.values.plotId)
    );
    const selectedProduct = products.find(
      (curr: Product) => curr.id === Number($e.target.value)
    );

    formik.setValues({
      ...formik.values,
      productId: selectedProduct.id,
      unitCost: selectedProduct.unitPrice.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      measurementUnit: selectedProduct.measurementUnit,
      productCategory: selectedProduct.category.id,
      plotCost: (
        selectedPlot.size *
        (formik.values.dosePerHecatare * selectedProduct.unitPrice)
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      hectareCost: (
        formik.values.dosePerHecatare * selectedProduct.unitPrice
      ).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
      dosePerHecatare: formik.values.dosePerHecatare,
    });
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="inputs flex flex-row flex-wrap items-center justify-start gap-4">
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
          id="executionDateInput"
        />

        <TextField
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.description ? formik.errors.description : null}
          disabled={disabled || !!operation || propLoading}
          name="description"
          placeholder="Operação"
          label="Operação"
        />

        <SelectField
          name="plotId"
          disabled={getPlotsLoading || !!operation || propLoading}
          options={plots?.length > 0 ? plots : []}
          value={formik.values.plotId}
          onChange={async (e) => {
            formik.handleChange(e);
            const selectedPlot = plots.find(
              (curr: Plot) => curr.id === Number(e.target.value)
            );
            refetchProducts({ propertyId: selectedPlot.property.id });
          }}
          onBlur={formik.handleBlur}
          errors={formik.touched.plotId ? formik.errors.plotId : null}
          placeholder="Selecione um talhão"
          label="Talhão"
        />

        <SelectField
          name="productId"
          disabled={
            getProductsLoading ||
            !formik.values.plotId ||
            !!operation ||
            propLoading ||
            getProductsLoading ||
            !products
          }
          options={products?.length > 0 ? products : []}
          value={formik.values.productId}
          onChange={changeProduct}
          onBlur={formik.handleBlur}
          errors={formik.touched.productId ? formik.errors.productId : null}
          placeholder="Selecione um produto"
          label="Produto"
        />

        <TextField
          value={formik.values.dosePerHecatare}
          onChange={($e) => {
            calculateQuantity($e);
          }}
          onBlur={formik.handleBlur}
          errors={
            formik.touched.dosePerHecatare
              ? formik.errors.dosePerHecatare
              : null
          }
          disabled={disabled || !formik.values.productId || propLoading}
          name="dosePerHecatare"
          type="number"
          placeholder="Dose"
          label="Dose (ha)"
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
          placeholder="Unidade de medida"
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

      <div className="card-footer flex items-center justify-end py-4">
        <SecondaryButton
          type="button"
          onClick={cancelFunction}
          className="mr-3"
        >
          {operation ? 'Fechar' : 'Cancelar'}
        </SecondaryButton>

        {submitFunction && (
          <PrimaryButton
            type="submit"
            disabled={isSubmitDisabled}
            onClick={formik.handleSubmit}
          >
            {confirmBtn}
          </PrimaryButton>
        )}
      </div>
    </form>
  );
}

export default OperationForm;
