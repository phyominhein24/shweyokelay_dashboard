import { paths } from "../../constants/paths";
import { AgentCreate } from "./entry/AgentCreate";
import { AgentUpdate } from "./entry/AgentUpdate";

import { AgentList } from "./list/AgentList";

export const agentRoutes = [
    {
        id: "agent",
        path: paths.agent,
        element: <AgentList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Agent" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "agentCreate",
        path: paths.agentCreate,
        element: <AgentCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Agent", url: paths.agent },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "agentDetail",
        path: `/${paths.agent}/:id`,
        element: <AgentUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Agent", url: paths.agent },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
