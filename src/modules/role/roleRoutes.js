import { paths } from "../../constants/paths";
import { RoleCreate } from "./entry/RoleCreate";
import { RoleUpdate } from "./entry/RoleUpdate";

import { RoleList } from "./list/RoleList";

export const roleRoutes = [
    {
        id: "role",
        path: paths.role,
        element: <RoleList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Role" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "roleCreate",
        path: paths.roleCreate,
        element: <RoleCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Role", url: paths.role },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "roleDetail",
        path: `/${paths.role}/:id`,
        element: <RoleUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Role", url: paths.role },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
