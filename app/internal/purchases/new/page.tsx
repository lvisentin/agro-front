import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton/SecondaryButton';
import { SelectOption } from '@/components/SelectField/SelectField.model';
import TextField from '@/components/TextField/TextField';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { newProductValidationSchema } from '@/shared/validationSchemas/NewProduct.schema';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';

function NewPurhcasePage() {
  const router = useRouter();

  const categories: SelectOption[] = [
    {
      value: 'test',
      label: 'test',
    },
  ];

  function createProduct() {
    console.log('createProduct');
  }

  function goBack() {
    router.push(PageRoutes.ListProducts);
  }

  return (
    <div className="new__product__wrapper">
      <div className="prose flex justify-between w-full max-w-full"></div>

      <div className="page__content">
        <div className="card w-full bg-base-100 shadow-xl rounded-md">
          <div className="card-title px-6 py-4">
            <h2 className="prose-h2">Cadastrar produto</h2>
          </div>
          <div className="card-body pt-2 pb-4">
            <Formik
              initialValues={{
                name: '',
                category: 0,
                quantity: 0,
                minQuantity: 0,
                unitCost: 0,
              }}
              validationSchema={newProductValidationSchema}
              onSubmit={(values) => console.log(values)}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                dirty,
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
                      name="name"
                      placeholder="Digite um nome..."
                      label="Nome"
                    />

                    <TextField
                      value={values.minQuantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="minQuantity"
                      errors={touched.minQuantity ? errors.minQuantity : null}
                      placeholder="Digite o valor"
                      label="Qtd mínima em estoque"
                    />
                  </div>

                  <div className="card-footer flex items-center justify-end p-4">
                    <SecondaryButton
                      type="button"
                      onClick={goBack}
                      className="mr-3"
                    >
                      Cancelar
                    </SecondaryButton>

                    <PrimaryButton
                      type="submit"
                      onClick={createProduct}
                      disabled={!isValid || !dirty}
                    >
                      Salvar Compra
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPurhcasePage;
