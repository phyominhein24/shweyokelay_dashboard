import { paths } from "../../constants/paths";
import { VehiclesTypeCreate } from "./entry/VehiclesTypeCreate";
import { VehiclesTypeUpdate } from "./entry/VehiclesTypeUpdate";

import { VehiclesTypeList } from "./list/VehiclesTypeList";

export const vehiclesTypeRoutes = [
    {
        id: "vehiclesType",
        path: paths.vehiclesType,
        element: <VehiclesTypeList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "VehiclesType" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "vehiclesTypeCreate",
        path: paths.vehiclesTypeCreate,
        element: <VehiclesTypeCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "VehiclesType", url: paths.vehiclesType },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "vehiclesTypeDetail",
        path: `/${paths.vehiclesType}/:id`,
        element: <VehiclesTypeUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "VehiclesType", url: paths.vehiclesType },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
