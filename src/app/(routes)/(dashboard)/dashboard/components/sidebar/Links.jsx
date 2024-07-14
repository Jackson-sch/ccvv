import { Megaphone } from "lucide-react";
import { FaDashcube } from "react-icons/fa";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdAttachMoney,
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
        icon: <FaDashcube width={20} height={20} strokeWidth={2}  />,
      },
      {
        title: "Lo más Relevante",
        path: "/dashboard/transactions",
        icon: <Megaphone width={20} height={20} strokeWidth={2} />,
      },
    ],
  },
  {
    title: "Base",
    list: [
      {
        title: "Ocurrencias",
        path: "/dashboard/base/ocurrencia",
        icon: <MdWork />,
      },
    ],
  },
  {
    title: "Incidencias",
    list: [
      {
        title: "Registro",
        path: "/incidencias",
        icon: <MdLocationPin />,
      },
      {
        title: "Lista",
        path: "/incidencias/lista",
        icon: <MdDataset />,
      },
    ],
  },
  {
    title: "Vehículos",
    list: [
      {
        title: "Reportados",
        path: "/vehiculo/reportados",
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
        path: "/dashboard/settings",
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
        title: "Marca Vehículos",
        path: "/dashboard/admin/marcas",
        icon: <MdFitbit />,
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
