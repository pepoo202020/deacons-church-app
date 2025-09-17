import DashboardHeader from "@/components/Dashboard/Header";
import DashboardNavMenu from "@/components/Dashboard/NavMenu";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex flex-col items-start justify-start">
      <DashboardHeader />
      <div className="flex-1 h-full w-full overflow-x-hidden overflow-y-hidden hover:overflow-y-auto p-5">
        {children}
      </div>
      <DashboardNavMenu />
    </div>
  );
}
