'use client';
import MainLayout from '@/components/Layouts/MainLayout/MainLayout';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Revenue Rocket 🚀</title>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MainLayout>{children}</MainLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
