import { paths } from "../../constants/paths"
import { DashboardList } from "./list/DashboardList"


export const dashboardRoutes = [
    {
        id: "dashboard",
        path: paths.dashboard,
        element : <DashboardList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]