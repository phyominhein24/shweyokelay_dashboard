import { paths } from "../../constants/paths";
import { SroutesCreate } from "./entry/SroutesCreate";
import { SroutesUpdate } from "./entry/SroutesUpdate";

import { SroutesList } from "./list/SroutesList";

export const sroutesSroutes = [
    {
        id: "sroutes",
        path: paths.sroutes,
        element: <SroutesList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Sroutes" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "sroutesCreate",
        path: paths.sroutesCreate,
        element: <SroutesCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Sroutes", url: paths.sroutes },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "sroutesDetail",
        path: `/${paths.sroutes}/:id`,
        element: <SroutesUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Sroutes", url: paths.sroutes },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
