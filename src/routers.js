import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import NotFound from "./layouts/default/pages/NotFound";
import { BlankTemplate } from "./layouts/default/pages/BlankTemplate";
import { Login } from "./modules/auth/entry/Login";
import { dashboardRoutes } from "./modules/dashboard/dashboardRoute";
import { counterRoutes, shopRoutes } from "./modules/counter/counterRoutes";
import { userRoutes } from "./modules/user/userRoutes";
import { vehiclesTypeRoutes } from "./modules/vehiclesType/vehiclesTypeRoutes";
import { memberRoutes } from "./modules/member/memberRoutes";
import { paymentHistoryRoutes } from "./modules/paymentHistory/paymentHistoryRoutes";
import { routesRoutes } from "./modules/routes/routesRoutes";
import { roleRoutes } from "./modules/role/roleRoutes";
import { agentRoutes } from "./modules/agent/agentRoutes";
import { adminRoutes } from "./modules/admin/adminRoutes";
import { sroutesSroutes } from "./modules/sroutes/sroutesRoutes";
import { paymentRoutes } from "./modules/payment/paymentRoutes";
import { dailyRouteRoutes } from "./modules/dailyRoute/dailyRouteRoutes";


export const routers = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            ...dashboardRoutes,
            ...paymentHistoryRoutes,
            ...routesRoutes,
            ...sroutesSroutes,
            ...vehiclesTypeRoutes,
            ...counterRoutes,
            ...memberRoutes,
            ...agentRoutes,
            ...userRoutes,
            ...roleRoutes,
            ...adminRoutes,
            ...paymentRoutes,
            ...dailyRouteRoutes
        ],
    },
    {
        path: "auth",
        element: <BlankTemplate />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);