import Header from "@/components/MainLayout/Header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex flex-col items-start justify-start">
      <Header />
      {children}
    </div>
  );
}
