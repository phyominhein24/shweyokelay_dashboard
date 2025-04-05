import { paths } from "../../constants/paths";
import { ContactCreate } from "./entry/ContactCreate";
import { ContactUpdate } from "./entry/ContactUpdate";

import { ContactList } from "./list/ContactList";

export const contactRoutes = [
    {
        id: "contact",
        path: paths.contact,
        element: <ContactList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: null, url: null, current: "Contact" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "contactCreate",
        path: paths.contactCreate,
        element: <ContactCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Contact", url: paths.contact },
                    { label: null, url: null, current: "Create" },
                ],
                role: ["ADMINISTRATOR"],
            };
        },
    },
    {
        id: "contactDetail",
        path: `/${paths.contact}/:id`,
        element: <ContactUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Contact", url: paths.contact },
                    { label: null, url: null, current : "Update" },
                ]
            }
        }
    }
];
