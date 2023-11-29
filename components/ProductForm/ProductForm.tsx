import { GetProductCategoriesQuery } from '@/shared/graphql/queries/GetProductCategories.query';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { ProductMeasurementUnit } from '@/shared/models/products/Products.model';
import {
  getEnumValues,
  translateMeasurementUnit,
} from '@/shared/utils/getEnumValues';
import { newProductValidationSchema } from '@/shared/validationSchemas/NewProduct.schema';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
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
  ).map(
    (unit, i) =>
      ({ id: unit, name: translateMeasurementUnit(unit) }) as SelectOption
  );

  const formik = useFormik({
    initialValues: {
      // code: product?.code ? product.code : '',
      categoryId: product?.category ? product.category.id : 0,
      propertyId: product?.property ? product.property.id : 0,
      measurementUnit: product?.measurementUnit ? product.measurementUnit : 0,
      name: product?.name ? product?.name : '',
      quantity: product?.quantity ? product?.quantity : 0,
      minimumQuantity: product?.minimumQuantity
        ? product?.minimumQuantity
        : 0,
      unitPrice: product?.unitPrice
        ? product?.unitPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
        : '',
    },
    validationSchema: newProductValidationSchema,
    onSubmit: (values) => submitFunction(values)
  })

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col">
      <div className="inputs flex flex-row flex-wrap items-start justify-start gap-4">
        <TextField
          value={formik.values.name}
          disabled={loading}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errors={formik.touched.name ? formik.errors.name : null}
          name="name"
          placeholder="Nome"
          label="Nome"
        />

        <SelectField
          name="categoryId"
          options={productCategories}
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={categoriesLoading || loading}
          errors={formik.touched.categoryId ? formik.errors.categoryId : null}
          placeholder="Selecione uma categoria"
          label="Categoria"
        />

        <SelectField
          name="propertyId"
          options={properties}
          value={formik.values.propertyId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={propertiesLoading || loading}
          errors={formik.touched.propertyId ? formik.errors.propertyId : null}
          placeholder="Selecione uma propriedade"
          label="Propriedade"
        />

        <SelectField
          name="measurementUnit"
          options={measurementUnits}
          value={formik.values.measurementUnit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={loading}
          errors={formik.touched.measurementUnit ? formik.errors.measurementUnit : null}
          placeholder="Selecione uma unidade de medida"
          label="Unidade de medida"
        />

        <TextField
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="quantity"
          type="number"
          disabled={loading}
          errors={formik.touched.quantity ? formik.errors.quantity : null}
          placeholder="Quantidade em estoque"
          label="Quantidade em estoque"
        />

        <CurrencyField
          value={formik.values.unitPrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="unitPrice"
          disabled={loading}
          errors={formik.touched.unitPrice ? formik.errors.unitPrice : null}
          placeholder="Custo unitário"
          label="Custo unitário"
        />

        <TextField
          value={formik.values.minimumQuantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={loading}
          type="number"
          name="minimumQuantity"
          errors={formik.touched.minimumQuantity ? formik.errors.minimumQuantity : null}
          placeholder="Qtd mínima em estoque"
          label="Qtd mínima em estoque"
        />
      </div>

      <div className="card-footer flex items-center justify-end py-4">
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
          disabled={formik.values.minimumQuantity <= 0 ||
            formik.values.quantity <= 0 || 
            !product && (!formik.isValid || !formik.dirty)
          }
          onClick={formik.handleSubmit}
        >
          Salvar Produto
        </LoadingButton>
      </div>
    </form>
  );
}

export default ProductForm;
