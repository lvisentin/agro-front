import PrimaryLayout from '@/components/layouts/primary/PrimaryLayout';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '../styles/globals.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export const metadata = {
  title: 'GesRural',
  description: 'GesRural',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
