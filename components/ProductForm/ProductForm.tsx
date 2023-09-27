import { GetProductCategoriesQuery } from '@/shared/graphql/queries/GetProductCategories.query';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { ProductMeasurementUnit } from '@/shared/models/products/Products.model';
import getEnumValues from '@/shared/utils/getEnumValues';
import { useQuery } from '@apollo/client';
import { Formik } from 'formik';
import CurrencyField from '../CurrencyInput/CurrencyField';
import LoadingButton from '../LoadingButton/LoadingButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import SelectField from '../SelectField/SelectField';
import { SelectOption } from '../SelectField/SelectField.model';
import TextField from '../TextField/TextField';
import { ProductFormProps } from './ProductForm.model';

function ProductForm({
  product,
  submitFunction,
  cancelFunction,
  loading = false,
}: ProductFormProps) {
  const { loading: categoriesLoading, data: { productCategories } = {} } =
    useQuery(GetProductCategoriesQuery);

  const { loading: propertiesLoading, data: { properties } = {} } =
    useQuery(GetPropertiesQuery);

  const measurementUnits: SelectOption[] = getEnumValues(
    ProductMeasurementUnit
  ).map((unit, i) => ({ id: unit, name: unit }) as SelectOption);

  return (
    <Formik
      initialValues={{
        code: product?.code ? product.code : '',
        categoryId: product?.category ? product.category.id : 0,
        propertyId: product?.property ? product.property.id : 0,
        measurementUnit: product?.measurementUnit ? product.measurementUnit : 0,
        name: product?.name ? product?.name : '',
        quantity: product?.quantity ? product?.quantity : 0,
        minimumQuantity: product?.minimumQuantity
          ? product?.minimumQuantity
          : 0,
        unitPrice: product?.unitPrice ? product?.unitPrice : 0,
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
              value={values.code}
              disabled={loading}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.code ? errors.code : null}
              name="code"
              placeholder="Digite um código..."
              label="Código"
            />

            <TextField
              value={values.name}
              disabled={loading}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.name ? errors.name : null}
              name="name"
              placeholder="Digite um nome..."
              label="Nome"
            />

            <SelectField
              name="categoryId"
              options={productCategories}
              value={values.categoryId}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={categoriesLoading || loading}
              errors={touched.categoryId ? errors.categoryId : null}
              placeholder="Selecione uma categoria"
              label="Categoria"
            />

            <SelectField
              name="propertyId"
              options={properties}
              value={values.propertyId}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={propertiesLoading || loading}
              errors={touched.propertyId ? errors.propertyId : null}
              placeholder="Selecione uma propriedade"
              label="Propriedade"
            />

            <SelectField
              name="measurementUnit"
              options={measurementUnits}
              value={values.measurementUnit}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              errors={touched.measurementUnit ? errors.measurementUnit : null}
              placeholder="Selecione uma unidade de medida"
              label="Unidade de medida"
            />

            <TextField
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              name="quantity"
              disabled={loading}
              errors={touched.quantity ? errors.quantity : null}
              placeholder="Quantidade em estoque..."
              label="Quantidade em estoque"
            />

            <CurrencyField
              value={values.unitPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              name="unitPrice"
              disabled={loading}
              errors={touched.unitPrice ? errors.unitPrice : null}
              placeholder="Digite o valor..."
              label="Custo unitário"
            />

            <TextField
              value={values.minimumQuantity}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              name="minimumQuantity"
              errors={touched.minimumQuantity ? errors.minimumQuantity : null}
              placeholder="Digite o valor"
              label="Qtd mínima em estoque"
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

            <LoadingButton
              loading={loading}
              type="submit"
              onClick={handleSubmit}
            >
              Salvar Produto
            </LoadingButton>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default ProductForm;
