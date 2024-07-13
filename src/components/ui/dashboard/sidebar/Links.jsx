import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdDesktopWindows,
  MdFitbit,
  MdPolicy,
  MdMap,
  MdLocationPin,
  MdDataset,
} from "react-icons/md";

export const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Products",
        path: "/dashboard/products",
        icon: <MdShoppingBag />,
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
      {
        title: "Reports",
        path: "/dashboard/base/ocurrencia",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/base/ocurrencia",
        icon: <MdPeople />,
      },
    ],
  },
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
    ],
  },
  {
    title: "Vehículos",
    list: [
      {
        title: "Marcas",
        path: "/dashboard/marcas",
        icon: <MdFitbit />,
      },
      {
        title: "Lista",
        path: "/dashboard/vehiculo/reportados",
        icon: <MdPolicy />,
      },
    ],
  },
  {
    title: "User",
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
    ],
  },
  {
    title: "Mantenimiento",
    list: [
      {
        title: "Ubicaciones",
        path: "/dashboard/ubicacion",
        icon: <MdLocationPin />,
      },
      {
        title: "Clasificación",
        path: "/dashboard/clasificacion",
        icon: <MdHelpCenter />,
      },
      {
        title: "Ocurrencias",
        path: "/dashboard/ocurrencias",
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
];
