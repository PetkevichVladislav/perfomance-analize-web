import MainLayout from '@/components/Layouts/MainLayout/MainLayout';

export const metadata = {
  title: 'Revenue Rocket 🚀',
  description: '<EPAM.AI> App for Performance Advices',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
