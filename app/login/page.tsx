'use client';

import TextField from '@/components/TextField/TextField';
import eyeSlashSvgSrc from '@/resources/svg/eye-slash.svg';
import eyeSvgSrc from '@/resources/svg/eye.svg';
import lockSvgSrc from '@/resources/svg/lock.svg';
import mailSvgSrc from '@/resources/svg/mail.svg';
import LoadingButton from '@/components/LoadingButton/LoadingButton';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import PageTransition from '@/components/PageTransition/PageTransition';
import { useEffect, useState } from 'react';
import styles from './Login.module.scss';

export default function LoginPage() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <PageTransition
      className={
        'prose prose-a:no-underline card bg-base-100 rounded-md w-full max-w-xl sm:p-6 sm:shadow-md sm:border-[1px] sm:border-gray-200 mx-auto my-auto'
      }
    >
      <div>
        <Image
          src="/eh-blue.svg"
          alt="English Helper Logo"
          width={50}
          height={50}
          className={'w-full m-0 max-h-16'}
        />

        <p className={'text-center mb-2'}>
          Novo aqui?{' '}
          <span className={'prose-a:hover:underline'}>
            <Link href={'/sign-up'} className={'text-primary'}>
              {' '}
              Crie uma conta
            </Link>
          </span>
        </p>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => console.log(values)}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <>
              <form
                className={'grid grid-cols-10 gap-x-4 gap-y-2'}
                onSubmit={handleSubmit}
              >
                <TextField
                  placeholder={'Seu email'}
                  label={'Email'}
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  leadingIcon={
                    <Image
                      src={mailSvgSrc}
                      alt={'icone representando uma carta'}
                      className={`w-6 h-6 max-w-6 ${styles.svg}`}
                    />
                  }
                  className={'col-span-10'}
                />
                <TextField
                  placeholder={'Sua senha'}
                  label={'Senha'}
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  leadingIcon={
                    <Image
                      src={lockSvgSrc}
                      alt={'icone representando um cadeado'}
                      width={24}
                      className={`w-6 h-6 ${styles.svg}`}
                    />
                  }
                  trailingIcon={{
                    type: 'toggle',
                    initialIcon: (
                      <Image
                        src={eyeSvgSrc}
                        alt={'icone representando um olho humano'}
                        className={`w-6 h-6 swap-on ${styles.svg}`}
                      />
                    ),
                    secondIcon: (
                      <Image
                        src={eyeSlashSvgSrc}
                        alt={'icone representando um olho humano riscado'}
                        className={`w-6 h-6 swap-off ${styles.svg}`}
                      />
                    ),
                  }}
                  className={'col-span-10'}
                />

                <div className={'flex flex-col w-full col-span-10'}>
                  <p className={'text-right my-4'}>
                    <span
                      className={'prose-a:no-underline prose-a:hover:underline'}
                    >
                      <Link href={'/password-reset'}>Esqueceu sua senha?</Link>
                    </span>
                  </p>

                  <LoadingButton
                    loading={loading}
                    disabled={loading}
                    className={`${styles.loginBtn} btn btn-primary mt-0`}
                    type="submit"
                  >
                    Entrar
                  </LoadingButton>
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
    </PageTransition>
  );
}
