import { GetProductsQuery } from '@/shared/graphql/queries/GetProducts.query';
import { GetPurchaseProductQuery } from '@/shared/graphql/queries/GetPurchaseProduct.query';
import { Product } from '@/shared/models/products/Products.model';
import { Purchase } from '@/shared/models/purchases/Purchases.model';
import { NewPurchaseValidationSchema } from '@/shared/validationSchemas/NewPurchase.schema';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { useState } from 'react';
import DataTable from '../DataTable/DataTable';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
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
  const { data: { products } = {}, loading: getProductsLoading } =
    useQuery(GetProductsQuery);

  const { data: { purchaseProduct } = {}, loading: getPurchaseProductLoading } =
  useQuery(GetPurchaseProductQuery);

  const columns = [
    {
      field: 'productId',
      name: 'Código',
    },
    {
      field: 'product',
      name: 'Produto',
    },
    {
      field: 'amountPerUnit',
      name: 'Quantidade',
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
      transformData: (data: Product) =>
        `${data.unitPrice.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
  ];

  function deleteProduct(product: Product) {
    console.log('product', product);
  }

  function onSubmit() {
    if (isEditing) {
      setIsEditing(false);
      setValues({
        id: 0,
        description: '',
        property: '',
        propertyId: 0,
        totalCost: 0,
        code: '',
        amountPerUnit: 0,
        units: 0,
      });
      return;
    }
    setValues({
      id: 0,
      description: '',
      property: '',
      propertyId: 0,
      totalCost: 0,
      code: '',
      amountPerUnit: 0,
      units: 0,
    });
  }

  const {
    values,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setValues,
  } = useFormik({
    initialValues: {
      id: 0,
      description: '',
      property: '',
      propertyId: 0,
      totalCost: 0,
      code: '',
      amountPerUnit: 0,
      units: 0,
    },
    validationSchema: NewPurchaseValidationSchema,
    onSubmit,
  });

  function goToEdit(purchase: Purchase) {
    setValues(purchase);
    setIsEditing(true);
  }

  function getData(item: any) {
    console.log('log', item.id);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">{pageTitle}</h2>
        </div>

        <div className="card bg-base-100 rounded-lg">
          <div className="card-body pt-4 pb-4 w-72">
            <TextField
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.description ? errors.description : null}
              disabled={disabled}
              name="description"
              placeholder="Digite uma descrição"
              label="Descrição"
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
              value={values.code}
              onChange={(e) => {
                console.log(values.code);
                setFieldValue('id', e.value);
                getData(e);
              }}
              onBlur={handleBlur}
              errors={touched.code ? errors.code : null}
              disabled={disabled}
              name="code"
              placeholder="Pesquisar produto por produto"
              label="Produto"
            />

            <TextField
              value={values.amountPerUnit}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.amountPerUnit ? errors.amountPerUnit : null}
              disabled={disabled}
              name="amountPerUnit"
              placeholder="Quantidade"
              label="Quantidade"
            />

            <TextField
              value={values.totalCost}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.totalCost ? errors.totalCost : null}
              disabled={disabled || isEditing}
              name="totalCost"
              placeholder="Digite um valor"
              label="Valor"
            />

            <PrimaryButton className="mt-9" type="button">
              {isEditing ? 'Editar' : 'Adicionar'}
            </PrimaryButton>
          </div>
        </div>
      </form>

      {purchaseProduct?.length > 0 && (
        <DataTable
          data={purchaseProduct}
          columns={columns}
          handleEditClick={goToEdit}
          handleDeleteClick={deleteProduct}
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

        <PrimaryButton type="submit" onClick={submitFunction}>
          Salvar Compra
        </PrimaryButton>
      </div>
    </div>
  );
}

export default PurcharseForm;
