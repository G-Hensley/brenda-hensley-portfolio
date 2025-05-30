import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Brenda Hensley - Cybersecurity',
  description: "Brenda Hensley's Cybersecurity Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`antialiased min-h-svh h-fit`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
