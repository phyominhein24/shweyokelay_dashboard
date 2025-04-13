import AddIcon from "@mui/icons-material/Add";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import ContactsIcon from "@mui/icons-material/Contacts";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HandshakeIcon from "@mui/icons-material/Handshake";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import PaymentIcon from "@mui/icons-material/Payment";
import RouteIcon from "@mui/icons-material/Route";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TimelineIcon from "@mui/icons-material/Timeline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import { paths } from "../../constants/paths";

export const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    data: "Documents Folder",
    icon: <InsertChartIcon />,
    url: "/dashboard",
  },
  {
    key: "dailyRoute",
    label: "Daily Route",
    data: "Daily Route",
    icon: <TimelineIcon />,
    children: [
      {
        key: "dailyRouteList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.dailyRoute,
      },
    ],
  },
  {
    key: "paymentHistory",
    label: "Payment History",
    data: "Payment History",
    icon: <WorkHistoryIcon />,
    children: [
      {
        key: "paymentHistoryList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.paymentHistory,
      },
      // {
      //     key: "2-2",
      //     label: "Create",
      //     icon: <AddIcon />,
      //     url: paths.paymentHistoryCreate,
      // },
    ],
  },
  {
    key: "vehiclesType",
    label: "Vehicles Type",
    data: "Vehicles Type",
    icon: <DirectionsBusIcon />,
    children: [
      {
        key: "vehiclesTypeList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.vehiclesType,
      },
      {
        key: "vehiclesTypeCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.vehiclesTypeCreate,
      },
    ],
  },
  {
    key: "counter",
    label: "Counter",
    data: "Counter",
    icon: <StorefrontIcon />,
    children: [
      {
        key: "counterList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.counter,
      },
      {
        key: "counterCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.counterCreate,
      },
    ],
  },
  {
    key: "routes",
    label: "Routes",
    data: "Routes",
    icon: <RouteIcon />,
    children: [
      {
        key: "routesList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.routes,
      },
      {
        key: "routesCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.routesCreate,
      },
    ],
  },
  {
    key: "specialRoutes",
    label: "Special Routes",
    data: "Special Routes",
    icon: <AltRouteIcon />,
    children: [
      {
        key: "specialRoutesList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.sroutes,
      },
      {
        key: "specialRoutesCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.sroutesCreate,
      },
    ],
  },
  {
    key: "payment",
    label: "Payment Methods",
    data: "Payment",
    icon: <PaymentIcon />,
    children: [
      {
        key: "paymentList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.payment,
      },
      {
        key: "paymentCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.paymentCreate,
      },
    ],
  },
  {
    key: "member",
    label: "Member",
    data: "Member",
    icon: <Diversity3Icon />,
    children: [
      {
        key: "memberList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.member,
      },
      {
        key: "memberCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.memberCreate,
      },
    ],
  },
  {
    key: "agent",
    label: "Agent",
    data: "Agent",
    icon: <HandshakeIcon />,
    children: [
      {
        key: "agentList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.agent,
      },
      {
        key: "agentCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.agentCreate,
      },
    ],
  },

  {
    key: "user",
    label: "User",
    data: "User",
    icon: <Diversity1Icon />,
    children: [
      {
        key: "userList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.user,
      },
      {
        key: "userCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.userCreate,
      },
    ],
  },
  {
    key: "role",
    label: "Role",
    data: "Role",
    icon: <VpnKeyIcon />,
    children: [
      {
        key: "roleList",
        label: "List",
        icon: <FormatListBulletedIcon />,
        url: paths.role,
      },
      {
        key: "roleCreate",
        label: "Create",
        icon: <AddIcon />,
        url: paths.roleCreate,
      },
    ],
  },
  {
    key: "contact",
    label: "Contact",
    data: "Contact",
    icon: <ContactsIcon />,
    url: paths.contact,
  },
];
