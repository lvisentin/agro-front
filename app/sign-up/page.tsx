'use client';

import PageTransition from '@/components/PageTransition/PageTransition';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import TermsAndConditionsModal from '@/components/TermsAndConditionsModal/TermsAndConditionsModal';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import { SignUpMutation } from '@/shared/graphql/mutations/SignUp.mutation';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  const [signUp, { loading }] = useMutation(SignUpMutation);
  const router = useRouter();

  function handleSubmit({ email, password, name }: any) {
    signUp({
      variables: {
        input: {
          name,
          email,
          password,
        },
      },
    })
      .then(({ data: { signUp } }: any) => {
        toast.success('Conta criada com sucesso', {containerId: 'default'});
        localStorage.setItem('authorization', signUp.accessToken);
        router.push(PageRoutes.Dashboard);
      })
      .catch(() => toast.error('Ocorreu um erro, tente novamente', {containerId: 'default'}));
  }

  return (
    <>
      <TermsAndConditionsModal></TermsAndConditionsModal>
      <PageTransition
        className={
          'prose prose-a:no-underline card bg-base-100 rounded-md w-full max-w-xl sm:p-6 sm:shadow-md sm:border-[1px] sm:border-gray-200 mx-auto my-auto'
        }
      >
        <div>
          <h2 className={'text-center mt-0'}>Crie sua conta</h2>
          <p className={'text-center'}>
            Já tem uma conta?{' '}
            <span className={'prose-a:hover:underline'}>
              <Link href={'/login'} className={'text-primary'}>
                Faça login aqui
              </Link>
            </span>
          </p>

          <SignUpForm loading={loading} submitFunction={handleSubmit} />
        </div>
      </PageTransition>
    </>
  );
}
