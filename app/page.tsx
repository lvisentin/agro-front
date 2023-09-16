'use client';

import LoadingButton from '@/components/LoadingButton/LoadingButton';
import PhoneInput from '@/components/PhoneInput/PhoneInput';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { push } = useRouter();
  useEffect(() => {
    push('/login');
  }, []);

  return <></>;
}
