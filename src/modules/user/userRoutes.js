import { paths } from "../../constants/paths";
import { UserCreate } from "./entry/UserCreate";
import { UserUpdate } from "./entry/UserUpdate";

import { UserList } from "./list/UserList";

export const userRoutes = [
    {
        id: "user",
        path: paths.user,
        element: <UserList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "User" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "userCreate",
        path: paths.userCreate,
        element: <UserCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "User", url: paths.user },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "userDetail",
        path: `/${paths.user}/:id`,
        element: <UserUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "User", url: paths.user },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
