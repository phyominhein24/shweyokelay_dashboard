import { paths } from "../../constants/paths";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StoreIcon from '@mui/icons-material/Store';
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from '@mui/icons-material/Category';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import GroupsIcon from '@mui/icons-material/Groups';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PaymentIcon from '@mui/icons-material/Payment';


export const items = [
    {
        key: "0",
        label: "Dashboard",
        data: "Documents Folder",
        icon: <InsertChartIcon />,
        url: "/dashboard",
    },
    {
        key: "2",
        label: "Daily Route",
        data: "Daily Route",
        icon: <PaymentIcon />,
        children: [
            {
                key: "2-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.dailyRoute,
            }
        ],
    },
    {
        key: "2",
        label: "Payment History",
        data: "Payment History",
        icon: <PaymentIcon />,
        children: [
            {
                key: "2-1",
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
        key: "2",
        label: "Vehicles Type",
        data: "Vehicles Type",
        icon: <CategoryIcon />,
        children: [
            {
                key: "2-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.vehiclesType,
            },
            {
                key: "2-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.vehiclesTypeCreate,
            },
        ],
    },
    {
        key: "1",
        label: "Routes",
        data: "Routes",
        icon: <DirectionsBusIcon />,
        children: [
            {
                key: "1-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.routes,
            },
            {
                key: "1-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.routesCreate,
            },
        ],
    },
    {
        key: "1",
        label: "Special Routes",
        data: "Special Routes",
        icon: <DirectionsBusIcon />,
        children: [
            {
                key: "1-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.sroutes,
            },
            {
                key: "1-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.sroutesCreate,
            },
        ],
    },
    {
        key: "1",
        label: "Counter",
        data: "Counter",
        icon: <StoreIcon />,
        children: [
            {
                key: "1-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.counter,
            },
            {
                key: "1-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.counterCreate,
            },
        ],
    },
    {
        key: "1",
        label: "Member",
        data: "Member",
        icon: <GroupsIcon />,
        children: [
            {
                key: "1-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.member,
            },
            {
                key: "1-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.memberCreate,
            },
        ],
    },
    {
        key: "1",
        label: "Agent",
        data: "Agent",
        icon: <GroupsIcon />,
        children: [
            {
                key: "1-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.agent,
            },
            {
                key: "1-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.agentCreate,
            },
        ],
    },
    {
        key: "0",
        label: "Contact",
        data: "Contact",
        icon: <GroupsIcon />,
        url: paths.contact,
    },
    {
        key: "2",
        label: "Payment",
        data: "Payment",
        icon: <CategoryIcon />,
        children: [
            {
                key: "2-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.payment,
            },
            {
                key: "2-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.paymentCreate,
            },
        ],
    },
    {
        key: "2",
        label: "Role",
        data: "Role",
        icon: <VpnKeyIcon />,
        children: [
            {
                key: "2-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.role,
            },
            {
                key: "2-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.roleCreate,
            },
        ],
    },
    {
        key: "2",
        label: "User",
        data: "User",
        icon: <Diversity1Icon />,
        children: [
            {
                key: "2-1",
                label: "List",
                icon: <FormatListBulletedIcon />,
                url: paths.user,
            },
            {
                key: "2-2",
                label: "Create",
                icon: <AddIcon />,
                url: paths.userCreate,
            },
        ],
    },
];
