"use client";

import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton/SecondaryButton";
import TextField from "@/components/TextField/TextField";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { newPropertyValidationSchema } from "@/shared/validationSchemas/NewProperty.schema";
import { Formik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function NewPropertyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [editMode, setEditMode] = useState<boolean>(false);

  function createProperty() {
    console.log("createProperty");
  }

  function goBack() {
    router.push(PageRoutes.ListProperties);
  }

  useEffect(() => {
    const id = params.get("id");
    if (id) {
      setEditMode(true);
    }
  }, []);

  return (
    <div className="new__property__wrapper">
      <div className="prose flex justify-between w-full max-w-full"></div>

      <div className="page__content">
        <div className="card w-full bg-base-100 shadow-xl rounded-md">
          <div className="card-title px-6 py-4">
            <h2 className="prose-h2">Cadastrar propriedade</h2>
          </div>
          <div className="card-body pt-2 pb-4">
            <Formik
              initialValues={{
                name: "",
                description: "",
                size: 0,
              }}
              validationSchema={newPropertyValidationSchema}
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
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={touched.description ? errors.description : null}
                      name="description"
                      placeholder="Digite uma descrição..."
                      label="Descrição"
                    />

                    <TextField
                      value={values.size}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errors={touched.size ? errors.size : null}
                      name="size"
                      placeholder="Digite o tamanho..."
                      label="Tamanho da propriedade (ha)"
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
                      onClick={createProperty}
                      disabled={!isValid || !dirty}
                    >
                      Salvar Propriedade
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

export default NewPropertyPage;
