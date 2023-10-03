import { GetProductsQuery } from '@/shared/graphql/queries/GetProducts.query';
import { GetPropertiesQuery } from '@/shared/graphql/queries/GetProperties.query';
import { Product } from '@/shared/models/products/Products.model';
import { NewPurchaseValidationSchema } from '@/shared/validationSchemas/NewPurchase.schema';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CurrencyField from '../CurrencyInput/CurrencyField';
import DataTable from '../DataTable/DataTable';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import SelectField from '../SelectField/SelectField';
import SelectFieldWithFilter from '../SelectFieldWithFilter/SelectFieldWithFilter';
import TextField from '../TextField/TextField';
import { PurcharseFormProps } from './PurchaseForm.model';

function PurcharseForm({
  purchase,
  submitFunction,
  cancelFunction,
  disabled,
  pageTitle,
}: PurcharseFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [purchaseProduct, setPurchaseProduct] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>({});

  const { data: { products } = {}, loading: getProductsLoading } =
    useQuery(GetProductsQuery);

  const { loading: propertiesLoading, data: { properties } = {} } =
    useQuery(GetPropertiesQuery);

  useEffect(() => {
    if (purchase?.purchaseProducts) {
      setPurchaseProduct(purchase.purchaseProducts);
    }
  }, [purchase]);

  const columns = [
    // {
    //   field: 'productId',
    //   name: 'Código',
    // },
    {
      field: 'product',
      name: 'Produto',
      transformData: (prod: any) => purchase ? prod.product.name: prod.product,
    },
    {
      field: 'amountPerUnit',
      name: 'Quantidade',
      transformData: (prod: any) => purchase ? prod.units: prod.amountPerUnit,
    },
    {
      field: 'unitPrice',
      name: 'Custo unitário',
      transformData: (data: Product) =>
        `${data.unitPrice.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
    {
      field: 'totalCost',
      name: 'Custo total',
      transformData: (data: any) => {
        let totalCost = 0;

        if (!purchase) {
          totalCost =
            Number(data.amountPerUnit) * data.unitPrice.split('R$')[1];
        } else {
          totalCost = data.units * data.unitPrice;
        }

        console.log(data);
        return totalCost.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      },
    },
  ];

  function getData(item: any) {
    console.log(item);

    setSelectedProduct({
      product: item.name,
      productId: item.id,
    });
  }

  function onAddProduct() {
    const newProduct = {
      row: uuidv4(),
      productId: selectedProduct.productId,
      product: selectedProduct.product,
      amountPerUnit: formik.values.amountPerUnit,
      unitPrice: formik.values.totalCost,
      totalCost: formik.values.totalCost,
    };

    setPurchaseProduct([...purchaseProduct, newProduct]);

    formik.setValues({
      ...formik.values,
      code: '',
      amountPerUnit: 0,
      totalCost: 0,
    });

    formik.setFieldValue('code', '');
  }

  function deleteProduct(product: any) {
    const filtered = purchaseProduct.filter((prod: any) => {
      return prod.row !== product.row;
    });
    setPurchaseProduct(filtered);
  }

  //  function goToEdit() {
  //   setIsEditing(true);
  // }

  const formik = useFormik({
    initialValues: {
      id: purchase ? purchase.id : 0,
      description: purchase ? purchase.description : '',
      property: '',
      propertyId: purchase ? purchase.property.id : 0,
      totalCost: 0,
      code: '',
      amountPerUnit: 0,
    },
    validationSchema: NewPurchaseValidationSchema,
    onSubmit: (values) => submitFunction(values, purchaseProduct),
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">{pageTitle}</h2>
        </div>

        <div className="card bg-base-100 rounded-lg">
          <div className="card-body pt-4 pb-4 flex flex-row">
            <TextField
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={
                formik.touched.description ? formik.errors.description : null
              }
              disabled={disabled}
              name="description"
              placeholder="Digite uma descrição"
              label="Descrição"
            />

            <SelectField
              name="propertyId"
              options={properties}
              value={formik.values.propertyId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={propertiesLoading || disabled}
              errors={
                formik.touched.propertyId ? formik.errors.propertyId : null
              }
              placeholder="Selecione uma propriedade"
              label="Propriedade"
            />
          </div>
        </div>

        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">Inserir produto na compra</h2>
        </div>

        <div className="card bg-base-100 rounded-lg">
          <div className="card-body pt-4 pb-4 flex flex-row">
            <SelectFieldWithFilter
              options={products?.length > 0 ? products : []}
              value={formik.values.code}
              onChange={(e) => {
                formik.setFieldValue('code', e.value);
                getData(e);
              }}
              onBlur={formik.handleBlur}
              errors={formik.touched.code ? formik.errors.code : null}
              disabled={disabled || getProductsLoading}
              name="code"
              placeholder="Pesquisar produto por produto"
              label="Produto"
            />

            <TextField
              value={formik.values.amountPerUnit}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={
                formik.touched.amountPerUnit
                  ? formik.errors.amountPerUnit
                  : null
              }
              disabled={disabled}
              name="amountPerUnit"
              placeholder="Quantidade"
              label="Quantidade"
            />

            <CurrencyField
              value={formik.values.totalCost}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.touched.totalCost ? formik.errors.totalCost : null}
              disabled={disabled || isEditing}
              name="totalCost"
              placeholder="Digite um valor"
              label="Valor"
            />

            <PrimaryButton
              className="mt-9"
              type="button"
              onClick={onAddProduct}
              disabled={
                !formik.values.totalCost || !formik.values.amountPerUnit
              }
            >
              {isEditing ? 'Editar' : 'Adicionar'}
            </PrimaryButton>
          </div>
        </div>
      </form>

      {purchaseProduct?.length > 0 && (
        <DataTable
          data={purchaseProduct}
          columns={columns}
          handleDeleteClick={
            purchase ? undefined : (product) => deleteProduct(product)
          }
        />
      )}

      <div className="card-footer flex items-center justify-end p-4">
        <SecondaryButton
          type="button"
          onClick={cancelFunction}
          className="mr-3"
        >
          Cancelar
        </SecondaryButton>

        <PrimaryButton
          type="submit"
          onClick={formik.handleSubmit}
          disabled={!purchaseProduct || !formik.isValid || disabled}
        >
          Salvar Compra
        </PrimaryButton>
      </div>
    </div>
  );
}

export default PurcharseForm;
