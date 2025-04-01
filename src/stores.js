import { configureStore } from "@reduxjs/toolkit";
import countSlice from "./shares/countSlice";
import shareSlice from "./shares/shareSlice";
import dashboardSlice from "./modules/dashboard/dashboardSlice";
import userSlice from "./modules/user/userSlice";
import memberSlice from "./modules/member/memberSlice";
import agentSlice from "./modules/agent/agentSlice";
import paymentHistorySlice from "./modules/paymentHistory/paymentHistorySlice";
import counterSlice from "./modules/counter/counterSlice";
import routesSlice from "./modules/routes/routesSlice";
import sroutesSlice from "./modules/sroutes/sroutesSlice";
import roleSlice from "./modules/role/roleSlice";
import vehiclesTypeSlice from "./modules/vehiclesType/vehiclesTypeSlice";
import paymentSlice from "./modules/payment/paymentSlice";
import dailyRouteSlice from "./modules/dailyRoute/dailyRouteSlice";
import contactSlice from "./modules/contact/contactSlice";


export const stores = configureStore({
    reducer: {
        share: shareSlice,
        count: countSlice,
        user: userSlice,
        vehiclesType: vehiclesTypeSlice,
        dashboard: dashboardSlice,
        member: memberSlice,
        agent: agentSlice,
        paymentHistory: paymentHistorySlice,
        counter: counterSlice,
        routes: routesSlice,
        sroutes: sroutesSlice,
        role: roleSlice,
        payment: paymentSlice,
        dailyRoute: dailyRouteSlice,
        contact: contactSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
