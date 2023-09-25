import { PageRoutes } from '@/shared/enums/PageRoutes';
import { GetPurchasesQuery } from '@/shared/graphql/queries/GetPurchases.query';
import { Purchase } from '@/shared/models/purchases/Purchases.model';
import { NewPurchaseValidationSchema } from '@/shared/validationSchemas/NewPurchase.schema';
import { useQuery } from '@apollo/client';
import { Formik } from "formik";
import { useRouter } from 'next/navigation';
import DataTable from "../DataTable/DataTable";
import NoData from "../NoData/NoData";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";
import TextField from "../TextField/TextField";
import { PurcharseFormProps } from "./PurchaseForm.model";

function PurcharseForm({
  purchase,
  submitFunction,
  cancelFunction,
  loading = false,
}: PurcharseFormProps) {
  const router = useRouter();

  const {
    data: { purchases } = {},
  } = useQuery(GetPurchasesQuery);

  // const fakeObj = [
  //   {
  //     "_id": 2,
  //     "product": "Dessecação",
  //     "quantity": "Glifosato",
  //     "total": "123345"
  //   },
  //   {
  //     "_id": 2,
  //     "product": "Dessecação",
  //     "quantity": "Glifosato",
  //     "total": "123345"
  //   },
  // ]

  const columns = [
    {
      field: '_id',
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

  function addToTable() {
    console.log('addToTable');
  }

  function deletePurchase(purchase: Purchase) {
    console.log('Purchase', purchase);
  }

  function goToEdit(purchase: Purchase) {
    router.push(`${PageRoutes.NewPurchases}/${purchase._id}`);
  }
  return (
    <Formik
      initialValues={{
        description: purchases ? purchases.description : '',
        code: '',
        quantity: '',
        total: '',
      }}
      validationSchema={NewPurchaseValidationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
        isValid,
        dirty
      }) => (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="prose flex justify-between w-full max-w-full">
            <h2 className="prose-h2">Nova compra</h2>
          </div>
          
          <div className="card bg-base-100 rounded-lg">
            <div className="card-body w-72">
              <TextField
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={touched.description ? errors.description : null}
                name="name"
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
              <TextField
                value={values.code}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={touched.code ? errors.code : null}
                name="name"
                placeholder="Pesquisar produto por código"
                label="Código"
              />
              
              <TextField
                value={values.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={touched.quantity ? errors.quantity : null}
                name="name"
                placeholder="Quantidade"
                label="Quantidade"
              />

              <TextField
                value={values.total}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={touched.total ? errors.total : null}
                name="name"
                placeholder="Digite um valor"
                label="Valor"
              />

              <PrimaryButton className='mt-9' type="submit" onClick={addToTable}>
                Adicionar
              </PrimaryButton>
            </div>
          </div>

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
              disabled={!isValid || !dirty}
            >
              Salvar Compra
            </PrimaryButton>
          </div>
        </form>
      )}
    </Formik>   
  );
}

export default PurcharseForm;
