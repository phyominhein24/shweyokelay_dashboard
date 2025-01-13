import { paths } from "../../constants/paths";
import { RoutesCreate } from "./entry/RoutesCreate";
import { RoutesUpdate } from "./entry/RoutesUpdate";

import { RoutesList } from "./list/RoutesList";

export const routesRoutes = [
    {
        id: "routes",
        path: paths.routes,
        element: <RoutesList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Routes" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "routesCreate",
        path: paths.routesCreate,
        element: <RoutesCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Routes", url: paths.routes },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "routesDetail",
        path: `/${paths.routes}/:id`,
        element: <RoutesUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Routes", url: paths.routes },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
