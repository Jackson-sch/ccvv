import NavbarHeader from "@/components/ui/dashboard/navbar/Navbar";
import Sidebar from "@/components/ui/dashboard/sidebar/Sidebar";

export default function layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="w-full">
          <NavbarHeader />
        </div>
        <div className="w-full p-12">{children}</div>
      </div>
    </div>
  );
}
