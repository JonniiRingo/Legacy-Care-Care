import React from 'react';
import { Providers } from './providers';
import Layout from '@/components/layout/Layout';
import '@/globals.css';

export const metadata = {
  title: 'Legacy Car Care',
  description: 'Mobile detailing with that classic LA grit & shine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="generator" content="Hostinger Horizons" />
      </head>
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
