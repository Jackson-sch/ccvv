import NavbarHeader from "./dashboard/components/navbar/Navbar";
import Sidebar from "./dashboard/components/sidebar/Sidebar";

export default function layout({ children }) {
  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      <Sidebar />
      <div className="relative w-full flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <div className="w-full top-0 fixed z-50">
          <NavbarHeader />
        </div>
        <div className="w-full p-12 h-screen mt-16">{children}</div>
      </div>
    </div>
  );
}
