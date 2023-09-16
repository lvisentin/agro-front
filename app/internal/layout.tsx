'use client';
import Sidebar from '@/components/Sidebar/Sidebar';
import React from 'react';
import styles from './layout.module.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

export interface IInternalLayout {
  children: React.ReactNode;
}

const InternalLayout: React.FC<IInternalLayout> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className={`main flex flex-row h-full w-full`}>
          <Sidebar />

          <main
            className={`p-8 flex-grow bg-slate-100 overflow-auto ${styles.main}`}
          >
            {children}
          </main>
        </div>
      </QueryClientProvider>
    </>
  );
};
export default InternalLayout;
