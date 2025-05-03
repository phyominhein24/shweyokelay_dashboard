export const dailyRoutePayload = {
    update: {
        driver_name: "", 
        car_no: "",
        route_id: "",
        status: ""
    },
    store: {
        driver_name: "", 
        car_no: "",
        route_id: "",
        status: ""
    },
    columnsName: 'dailyRouteColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "driver_name", label: "Driver Name", minWidth: 100 },
        { id: "car_no", label: "Car No", minWidth: 100 },
        { id: "start_date", label: "Start Time", minWidth: 200 },
        { id: "route", label: "Route", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },
        // { id: "acc_number", label: "Facilities", minWidth: 100 },
        // { id: "acc_qr", label: "Status", minWidth: 100 },

        { id: "created_by", label: "Created By", minWidth: 100 },
        { id: "updated_by", label: "Updated By", minWidth: 100 },
        { id: "created_at", label: "Created At", minWidth: 100 },
        { id: "updated_at", label: "Updated At", minWidth: 100 },

        { id: "option", label: "Option", minWidth: 100 },
    ],
    paginateParams: {
        page: 1,
        per_page: 10,
        columns: "driver_name,car_no,route_id",
        search: "",
        order: "id",
        sort: "ASC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
