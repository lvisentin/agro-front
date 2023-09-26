import LoadingButton from '@/components/LoadingButton/LoadingButton';
import RadioButton from '@/components/RadioButton/RadioButton';
import TextField from '@/components/TextField/TextField';
import eyeSlashSvgSrc from '@/resources/svg/eye-slash.svg';
import eyeSvgSrc from '@/resources/svg/eye.svg';
import {
    faAt,
    faLock,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import Image from 'next/image';
import { SignUpFormProps } from './SignUpForm.model';
import styles from './SignUpForm.module.scss';

function SignUpForm({ loading, submitFunction }: SignUpFormProps) {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
      }}
      onSubmit={(values) => {
        if (values.password !== values.confirmPassword) {
          console.log('senhas divcrgentes');
          return;
        }
        submitFunction(values);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isValid,
      }) => (
        <form
          className={'grid grid-cols-10 gap-x-4 gap-y-0'}
          onSubmit={handleSubmit}
        >
          <TextField
            name="name"
            placeholder={'Nome'}
            label={'Nome'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            errors={touched.name ? errors.name : null}
            leadingIcon={
              <FontAwesomeIcon
                icon={faUser}
                className={`w-4 h-4 min-w-4 ${styles.svg}`}
              />
            }
            className={`col-span-10 ${styles.formControl}`}
          />

          <TextField
            name="email"
            placeholder={'exemplo@email.com'}
            label={'Email'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            errors={touched.email ? errors.email : null}
            leadingIcon={
              <FontAwesomeIcon
                icon={faAt}
                className={`w-4 h-4 min-w-4 ${styles.svg}`}
              />
            }
            className={`col-span-10 ${styles.formControl}`}
          />

          <TextField
            name="password"
            placeholder={'Sua senha'}
            label={'Senha'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            errors={touched.password ? errors.password : null}
            leadingIcon={
              <FontAwesomeIcon
                icon={faLock}
                className={`w-4 h-4 min-w-4 ${styles.svg}`}
              />
            }
            trailingIcon={{
              type: 'toggle',
              initialIcon: (
                <Image
                  src={eyeSvgSrc}
                  alt={'ad'}
                  className={`w-6 h-6 swap-on ${styles.svg}`}
                />
              ),
              secondIcon: (
                <Image
                  src={eyeSlashSvgSrc}
                  alt={'ad'}
                  className={`w-6 h-6 swap-off ${styles.svg}`}
                />
              ),
            }}
            className={`col-span-10 ${styles.formControl}`}
          />

          <TextField
            name="confirmPassword"
            placeholder={'Confirmar senha'}
            label={'Confirmar senha'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            errors={touched.confirmPassword ? errors.confirmPassword : null}
            leadingIcon={
              <FontAwesomeIcon
                icon={faLock}
                className={`w-4 h-4 min-w-4 ${styles.svg}`}
              />
            }
            trailingIcon={{
              type: 'toggle',
              initialIcon: (
                <Image
                  src={eyeSvgSrc}
                  alt={'ad'}
                  className={`w-6 h-6 swap-on ${styles.svg}`}
                />
              ),
              secondIcon: (
                <Image
                  src={eyeSlashSvgSrc}
                  alt={'ad'}
                  className={`w-6 h-6 swap-off ${styles.svg}`}
                />
              ),
            }}
            className={`col-span-10 ${styles.formControl}`}
          />

          <RadioButton
            name="acceptTerms"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.acceptTerms}
            label={
              <>
                Eu concordo com os{' '}
                <span className={'prose-a:hover:underline'}>
                  <button
                    onClick={() => {
                      //@ts-ignore
                      window.tec_modal!.show();
                    }}
                    className={'text-primary'}
                    type="button"
                  >
                    Termos e condições
                  </button>
                </span>
              </>
            }
            className={'col-span-10 mt-2'}
          />

          <LoadingButton
            className={'btn btn-primary mt-6 w-full col-span-10 border-0'}
            loading={loading}
            type="submit"
          >
            Criar conta
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
}

export default SignUpForm;
