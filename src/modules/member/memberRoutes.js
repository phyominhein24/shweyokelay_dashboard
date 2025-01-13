import { paths } from "../../constants/paths";
import { MemberCreate } from "./entry/MemberCreate";
import { MemberUpdate } from "./entry/MemberUpdate";

import { MemberList } from "./list/MemberList";

export const memberRoutes = [
    {
        id: "member",
        path: paths.member,
        element: <MemberList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Member" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "memberCreate",
        path: paths.memberCreate,
        element: <MemberCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Member", url: paths.member },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "memberDetail",
        path: `/${paths.member}/:id`,
        element: <MemberUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Member", url: paths.member },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
