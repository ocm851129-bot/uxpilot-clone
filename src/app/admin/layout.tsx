import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "UX Pilot — Admin CMS",
  description: "UX Pilot 관리자 패널",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {children}
      </div>
    </div>
  );
}
