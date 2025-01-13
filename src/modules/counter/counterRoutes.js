import { paths } from "../../constants/paths";
import { CounterCreate } from "./entry/CounterCreate";
import { CounterUpdate } from "./entry/CounterUpdate";

import { CounterList } from "./list/CounterList";

export const counterRoutes = [
    {
        id: "counter",
        path: paths.counter,
        element: <CounterList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Counter" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "counterCreate",
        path: paths.counterCreate,
        element: <CounterCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Counter", url: paths.counter },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "counterDetail",
        path: `/${paths.counter}/:id`,
        element: <CounterUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Counter", url: paths.counter },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
