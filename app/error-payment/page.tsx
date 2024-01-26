'use client';

import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import Image from 'next/image';
import Link from 'next/link';

export default function PaymentError() {
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
          <h1 className="font-bold mb-8 text-8xl">Ops!</h1>

          <h6 className="mb-2 text-3xl font-bold text-center text-gray-800">
              O seu período de teste acabou
          </h6>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Entre em contato com nossos especialistas para prosseguir
          </p>

          <Link
            href={'https://api.whatsapp.com/send/?phone=%2B554691319623&text&type=phone_number&app_absent=0'}
            data-sveltekit-preload-data="hover"
            target="_blank"
          >
            <PrimaryButton>
              Continuar
            </PrimaryButton>
          </Link>
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