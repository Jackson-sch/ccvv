"use client";
import { useState, useContext, createContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { dataAdmin, dataGeneral } from "./Links";
import { Divider } from "@nextui-org/react";
import { cn } from "@/utils/utils";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`h-screen ${expanded ? " overflow-y-auto" : ""}`}>
      <nav className="flex flex-col bg-background h-screen border-r border-default-50">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/webby2-dark.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-default-50 hover:bg-default-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-2">
            <p className={cn("mb-2 text-slate-500", expanded ? "" : "hidden")}>
              GENERAL
            </p>
            {dataGeneral.map((cat) => (
              <span className="ml-3" key={cat.title}>
                <span
                  className={`my-2 text-xs md:text-sm font-bold ${
                    expanded ? "visible" : "hidden"
                  }`}
                >
                  {expanded ? cat.title : cat.title.slice(0, 3).toUpperCase()}
                </span>
                {cat.list.map((item) => (
                  <SidebarItem key={item.title} item={item} />
                ))}
              </span>
            ))}

            <Divider />
            <p className={cn("my-2 text-slate-500", expanded ? "" : "hidden")}>
              ADMIN
            </p>
            {dataAdmin.map((cat) => (
              <span className="ml-3" key={cat.title}>
                <span
                  className={`my-2 text-xs md:text-sm font-bold ${
                    expanded ? "visible" : "hidden"
                  }`}
                >
                  {expanded ? cat.title : cat.title.slice(0, 3).toUpperCase()}
                </span>
                {cat.list.map((item) => (
                  <SidebarItem key={item.title} item={item} />
                ))}
              </span>
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className={cn("border-t border-default-50 flex p-3", expanded ? "" : "hidden")}>
          <footer className="p-3 mt-3 text-center">
            2024. Todos los derechos reservados
          </footer>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ item }) {
  const { expanded } = useContext(SidebarContext);
  const pathname = usePathname();
  const isActive = pathname === item.path;

  return (
    <Link
      href={item.path}
      className={cn(
        `relative flex text-sm text-default-500 items-center py-2 px-3 ml-3 my-1 font-medium transition-colors group  hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer`,
        isActive && "bg-slate-400/20 text-default-900"
      )}
    >
      {item.icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {item.title}
      </span>
      {/* {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400`}></div>
      )}
 */}
      {!expanded && (
        <div
          className={`absolute z-50 left-full rounded-md px-2 py-1 ml-6
        bg-indigo-100 text-indigo-800 text-sm
        invisible opacity-20 -translate-x-3 transition-all
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {item.title}
        </div>
      )}
    </Link>
  );
}
