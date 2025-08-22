import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'TSA Advisor',
  description: 'Sustainability Assessment Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}



