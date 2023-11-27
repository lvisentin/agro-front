'use client';

import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { PageRoutes } from '@/shared/enums/PageRoutes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { push } = useRouter();

  function goToHome() {
    push(PageRoutes.Login);
  }

  return (
    <>
      <div
        className="
          flex
          items-center
          justify-center
          w-screen
          h-screen
          bg-[#C6FBFF]
          relative
        "
      >
        <div className='absolute top-20'>
          <Image
            src="/GesrualLogoBlack.svg"
            alt="GesRural Logo"
            width={40}
            height={40}
            className={'w-full m-0 max-h-16'}
          />
        </div>
        <div className="flex flex-col items-center mb-5">
          <h1 className="font-bold text-9xl">404</h1>

          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            Ops, percebemos um erro
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Não foi possível acessar essa página.
          </p>

          <PrimaryButton onClick={goToHome}>
            Voltar a tela inicial
          </PrimaryButton>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 text-center">
          <div className="relative w-full">
            <Image
              src="/landscape.svg"
              alt="Não encontramos nada"
              layout="responsive"
              width={1510}
              height={250}
            />
          </div>
        </footer>
      </div>
    </>
  );
}