export const counterPayload = {
    update: {
        name: "", 
        phone: "", 
        city: "", 
        terminal: "", 
        status: ""
    },
    store: {
        name: "", 
        phone: "", 
        city: "", 
        terminal: "", 
        status: ""
    },
    columnsName: 'counterColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "phone", label: "Phone", minWidth: 100 },
        { id: "city", label: "City", minWidth: 150 },
        { id: "terminal", label: "Terminal", minWidth: 100 },
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
        columns: "name,phone,city,terminal",
        search: "",
        order: "id",
        sort: "ASC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
