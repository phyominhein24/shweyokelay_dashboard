export const vehiclesTypePayload = {
    update: {
        name: "", 
        seat_layout: "",
        total_seat: "",
        facilities: [],
        status: "",
    },
    store: {
        name: "", 
        seat_layout: "",
        total_seat: "",
        facilities: [],
        status: "",
    },
    columnsName: 'vehiclesTypeColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "seat_layout", label: "Seat Layout", minWidth: 100 },
        { id: "total_seat", label: "Total Seat", minWidth: 100 },
        { id: "facilities", label: "Facilities", minWidth: 100 },
        { id: "status", label: "Status", minWidth: 100 },

        { id: "created_by", label: "Created By", minWidth: 100 },
        { id: "updated_by", label: "Updated By", minWidth: 100 },
        { id: "created_at", label: "Created At", minWidth: 100 },
        { id: "updated_at", label: "Updated At", minWidth: 100 },

        { id: "option", label: "Option", minWidth: 100 },
    ],
    paginateParams: {
        page: 1,
        per_page: 10,
        columns: "name,seatLayout,totalSeat,facilities",
        search: "",
        order: "id",
        sort: "ASC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
