import { paths } from "../../constants/paths";
import { PaymentCreate } from "./entry/PaymentCreate";
import { PaymentUpdate } from "./entry/PaymentUpdate";

import { PaymentList } from "./list/PaymentList";

export const paymentRoutes = [
    {
        id: "payment",
        path: paths.payment,
        element: <PaymentList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Payment" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "paymentCreate",
        path: paths.paymentCreate,
        element: <PaymentCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Payment", url: paths.payment },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "paymentDetail",
        path: `/${paths.payment}/:id`,
        element: <PaymentUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Payment", url: paths.payment },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
