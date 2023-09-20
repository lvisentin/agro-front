'use client';

import myApolloClient from '@/apollo-client';
import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
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
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/react-modal/3.14.3/react-modal.min.js"
          integrity="sha512-MY2jfK3DBnVzdS2V8MXo5lRtr0mNRroUI9hoLVv2/yL3vrJTam3VzASuKQ96fLEpyYIT4a8o7YgtUs5lPjiLVQ=="
        />
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
