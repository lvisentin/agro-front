'use client';

import PurcharseForm from "@/components/PurchaseForm/PurchaseForm";
import { PageRoutes } from "@/shared/enums/PageRoutes";
import { UpdatePurchaseMutation } from "@/shared/graphql/mutations/UpdatePurchaseMutation.mutation";
import { GetPurchaseByIdQuery } from "@/shared/graphql/queries/GetPurchaseById.query";
import { Purchase } from "@/shared/models/purchases/Purchases.model";
import AnimatedPage from "@/shared/templates/AnimatedPage";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

type PageProps = {
  params: {
    id: string;
  };
};

function EditPurchasePage({ params: { id } }: PageProps) {
  const router = useRouter();

  const {
    loading,
    error,
    data: { purchase } = {},
  } = useQuery(GetPurchaseByIdQuery, { variables: { id: Number(id) } });

  const [updatePurchase, { loading: updateLoading }] =
    useMutation(UpdatePurchaseMutation);

    function handleEdit(values: Purchase) {
      const variables = {
        id: purchase.id,
        input: {
          ...values,
        },
      };
  
      updatePurchase({ variables: variables }).then(() => {
        toast.success('Compra atualizada com sucesso.');
        router.push(PageRoutes.ListPurchases);
      });
    }
    
    function goBack() {
      router.push(PageRoutes.ListPurchases);
    }

    if (loading) {
      return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (error) {
      toast.error('Ocorreu um erro, tente novamente');
    }

    return (
      <AnimatedPage>
        <div className="new__purchase__wrapper">
          <div className="page__content">
              {purchase && (
                <PurcharseForm
                  cancelFunction={goBack}
                  submitFunction={handleEdit}
                  purchase={purchase}
                  pageTitle="Editar Compra"
                  disabled={true}
                  loading={loading || updateLoading}
                />
              )}
            </div>
        </div>
      </AnimatedPage>
    );
}

export default EditPurchasePage;
