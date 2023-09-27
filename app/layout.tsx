'use client';

import myApolloClient from '@/apollo-client';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { Poppins } from 'next/font/google';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.scss';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

// export const metadata = {
//   title: 'GesRural',
//   description: 'GesRural',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    loadDevMessages();
    loadErrorMessages();
  }, []);
  return (
    <ApolloProvider client={myApolloClient}>
      <html lang="en" data-theme="light">
        <body className={poppins.className}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
          />
          <PrimaryLayout>{children}</PrimaryLayout>
        </body>
      </html>
    </ApolloProvider>
  );
}
