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
    title: "GENERAL",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Transactions",
        path: "/dashboard/transactions",
        icon: <MdAttachMoney />,
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
    title: "Admin",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Lista",
        path: "/dashboard/users",
        icon: <MdHelpCenter />,
      },
      {
        title: "Profile",
        path: "/dashboard/users/profile",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Ubicaciones",
        path: "/dashboard/ubicacion",
        icon: <MdLocationPin />,
      },
      {
        title: "Marcas",
        path: "/dashboard/marcas",
        icon: <MdFitbit />,
      },
      {
        title: "Ocurrencias",
        path: "/dashboard/ocurrencias",
        icon: <MdHelpCenter />,
      },
      {
        title: "Clasificación",
        path: "/dashboard/clasificacion",
        icon: <MdHelpCenter />,
      },
      {
        title: "Workstation",
        path: "/dashboard/workstation",
        icon: <MdDesktopWindows />,
      },
      {
        title: "Zonas",
        path: "/dashboard/zonas",
        icon: <MdMap />,
      },
    ],
  },
]