'use client';
import myApolloClient from '@/apollo-client';
import Sidebar from '@/components/Sidebar/Sidebar';
import { ApolloProvider } from '@apollo/client';
import React from 'react';
import styles from './layout.module.scss';

export interface IInternalLayout {
  children: React.ReactNode;
}

const InternalLayout: React.FC<IInternalLayout> = ({ children }) => {
  return (
    <>
      <ApolloProvider client={myApolloClient}>
        <div className={`main flex flex-row h-full w-full`}>
          <Sidebar />

          <main
            className={`p-8 flex-grow bg-slate-100 overflow-auto ${styles.main}`}
          >
            {children}
          </main>
        </div>
      </ApolloProvider>
    </>
  );
};
export default InternalLayout;
