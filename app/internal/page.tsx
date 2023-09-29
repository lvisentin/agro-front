'use client';

import Loading from '@/components/Loading/Loading';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InternalPage() {
  const { push } = useRouter();
  useEffect(() => {
    if (localStorage.getItem('authorization')) {
      push('/internal/dashboard');
    } else {
      push('/login');
    }
  }, []);

  return <Loading />;
}
