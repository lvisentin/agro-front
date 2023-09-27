import { Purchase } from '@/shared/models/purchases/Purchases.model';
import { NewPurchaseValidationSchema } from '@/shared/validationSchemas/NewPurchase.schema';
import { useFormik } from "formik";
import { useState } from 'react';
import DataTable from "../DataTable/DataTable";
import NoData from "../NoData/NoData";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import SelectFieldWithFilter from '../SelectFieldWithFilter/SelectFieldWithFilter';
import TextField from "../TextField/TextField";
import { PurcharseFormProps } from "./PurchaseForm.model";

function PurcharseForm({
  purchase,
  submitFunction,
  cancelFunction,
  disabled,
  pageTitle,
}: PurcharseFormProps) {

  const [ isEditing, setIsEditing ] = useState(false)

  // const {
  //   data: { purchases } = {},
  //   loading: getPurchasesLoading
  // } = useQuery(GetPurchasesQuery);

  const purchases:Array<Purchase> = [
    {
      id: "2",
      product: "Dessecação",
      quantity: 1243,
      total: 1523,
      category: "string 1",
      description: "string 1",
      createdAt: "28/06/2000"
    },
    {
      id: "1",
      product: "Pedro",
      quantity: 1213,
      total: 1233,
      category: "string 2",
      description: "string 2",
      createdAt: "28/06/2000"
    },
  ]

  const options = purchases.map(item => ({
    id: item.id,
    name: item.product
  }));

  const columns = [
    {
      field: 'id',
      name: 'Código',
    },
    {
      field: 'product',
      name: 'Produto',
    },
    {
      field: 'quantity',
      name: 'Quantidade',
    },
    {
      field: 'total',
      name: 'Custo unitário',
      transformData: (data: Purchase) =>
        `${data.total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
    {
      field: 'total',
      name: 'Custo total',
      transformData: (data: Purchase) =>
        `${data.total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`,
    },
  ];

  function deletePurchase(purchase: Purchase) {
    console.log('Purchase', purchase);
  }

  function onSubmit(purchase: Purchase) {
    if (isEditing) {
      setIsEditing(false)
      setValues({
        id: "",
        product: "",
        quantity: 0,
        total: 0,
        category: "",
        description: "",
        createdAt: ""
      })
      return
    }
    setValues({
      id: "",
      product: "",
      quantity: 0,
      total: 0,
      category: "",
      description: "",
      createdAt: ""
    })
  }

  const {
    values,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    setValues
  } = useFormik({
    initialValues: {
      id: "",
      product: "",
      quantity: 0,
      total: 0,
      category: "",
      description: "",
      createdAt: ""
    },
    validationSchema: NewPurchaseValidationSchema,
    onSubmit
  })

  function goToEdit(purchase: Purchase) {
    setValues(purchase);
    setIsEditing(true)
  }

  function getData (item:any) {
    console.log('log', item);
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="prose flex justify-between w-full max-w-full">
          <h2 className="prose-h2">{ pageTitle }</h2>
        </div>
        
        <div className="card bg-base-100 rounded-lg">
          <div className="card-body w-72">
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
          <div className="card-body flex flex-row">
            <SelectFieldWithFilter
              options={options?.length > 0 ? options : []}
              value={values.product}
              onChange={(e) => {
                setFieldValue('id', e.value)
                getData(e)
              }}
              onBlur={handleBlur}
              errors={touched.id ? errors.id : null}
              disabled={disabled}
              name="id"
              placeholder="Pesquisar produto por produto"
              label="Produto"
            />
            
            <TextField
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.quantity ? errors.quantity : null}
              disabled={disabled}
              name="quantity"
              placeholder="Quantidade"
              label="Quantidade"
            />

            <TextField
              value={values.total}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={touched.total ? errors.total : null}
              disabled={disabled || isEditing}
              name="total"
              placeholder="Digite um valor"
              label="Valor"
            />

            <PrimaryButton className='mt-9' type="submit" >
              {isEditing ? "Editar" : 'Adicionar'}
            </PrimaryButton>
          </div>
        </div>
      </form>

        {purchases?.length >= 0 ? (
          <DataTable
            data={purchases} 
            columns={columns}
            handleEditClick={goToEdit}
            handleDeleteClick={deletePurchase}
          />
        ) : (
          <NoData message={'Não encontramos nenhuma compra cadastrada'} />
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
            onClick={submitFunction}
          >
            Salvar Compra
          </PrimaryButton>
        </div>
    </div>
  );
}

export default PurcharseForm; 
