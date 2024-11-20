import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Логин",
  description: "Страница логина",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={'min-h-screen flex items-center justify-center'}>
        {children}
    </main>
  );
}
