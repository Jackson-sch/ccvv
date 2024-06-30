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
  /* {
    title: "Analytics",
    list: [
      {
        title: "Revenue",
        path: "/dashboard/revenue",
        icon: <MdWork />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdAnalytics />,
      },
      {
        title: "Teams",
        path: "/dashboard/teams",
        icon: <MdPeople />,
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
      }
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
        title: "Reportados",
        path: "/dashboard/reportados",
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
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
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
