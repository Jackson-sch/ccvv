import { LayoutDashboard, Megaphone } from "lucide-react";
import {
  MdSupervisedUserCircle,
  MdWork,
  MdOutlineSettings,
  MdHelpCenter,
  MdDesktopWindows,
  MdFitbit,
  MdPolicy,
  MdMap,
  MdLocationPin,
  MdDataset,
} from "react-icons/md";

export const dataGeneral = [
  {
    title: "Dashboard",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <LayoutDashboard width={20} height={20} strokeWidth={2}  />,
      },
      {
        title: "Lo más Relevante",
        path: "/posts-relevantes",
        icon: <Megaphone width={20} height={20} strokeWidth={2} />,
      },
    ],
  },
/*   {
    title: "Base",
    list: [
      {
        title: "Ocurrencias",
        path: "/dashboard/base/ocurrencia",
        icon: <MdWork />,
      },
    ],
  }, */
  {
    title: "Incidencias",
    list: [
      {
        title: "Registro",
        path: "/dashboard/incidencias",
        icon: <MdLocationPin />,
      },
      {
        title: "Lista",
        path: "/dashboard/incidencias/lista",
        icon: <MdDataset />,
      },
      {
        title: "Mapa del Calor",
        path: "/dashboard/incidencias/mapa-del-calor",
        icon: <MdMap />,
      }
    ],
  },
  {
    title: "Vehículos",
    list: [
      {
        title: "Reportados",
        path: "/dashboard/vehiculo/reportados",
        icon: <MdPolicy />,
      },
    ],
  },
];

export const dataAdmin = [
  {
    title: "Mantenimiento",
    list: [
      {
        title: "Settings",
        path: "/dashboard/admin/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Lista Usuarios",
        path: "/dashboard/admin/users",
        icon: <MdHelpCenter />,
      },
      {
        title: "Perfil Usuario",
        path: "/dashboard/admin/users/profile",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Ubicacion Cámaras",
        path: "/dashboard/admin/ubicacion",
        icon: <MdLocationPin />,
      },
      {
        title: "Tipo Ocurrencia",
        path: "/dashboard/admin/ocurrencias",
        icon: <MdHelpCenter />,
      },
      {
        title: "Tipo Clasificación",
        path: "/dashboard/admin/clasificacion",
        icon: <MdHelpCenter />,
      },
      {
        title: "Omegas",
        path: "/dashboard/admin/workstation",
        icon: <MdDesktopWindows />,
      },
      {
        title: "Zonas",
        path: "/dashboard/admin/zonas",
        icon: <MdMap />,
      },
    ],
  },
];
