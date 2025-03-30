import { paths } from "../../constants/paths";
import { DailyRouteCreate } from "./entry/DailyRouteCreate";
import { DailyRouteUpdate } from "./entry/DailyRouteUpdate";

import { DailyRouteList } from "./list/DailyRouteList";

export const dailyRouteRoutes = [
    {
        id: "dailyRoute",
        path: paths.dailyRoute,
        element: <DailyRouteList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "DailyRoute" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "dailyRouteCreate",
        path: paths.dailyRouteCreate,
        element: <DailyRouteCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "DailyRoute", url: paths.dailyRoute },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "dailyRouteDetail",
        path: `/${paths.dailyRoute}/:id`,
        element: <DailyRouteUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "DailyRoute", url: paths.dailyRoute },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
