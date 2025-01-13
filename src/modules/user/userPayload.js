export const userPayload = {
    update: {
        name: "", 
        email: "", 
        phone: "", 
        status: "",
        role_names: ""
    },
    store: {
        name: "", 
        email: "", 
        phone: "", 
        status: "",
        password: "",
        role_names: ""
    },
    columnsName: 'userColumns',
    columns: [
        { id: "id", label: "Id", minWidth: 60 },
        { id: "name", label: "Name", minWidth: 100 },
        { id: "phone", label: "Phone", minWidth: 100 },
        { id: "email", label: "Email", minWidth: 120 },
        { id: "role_names", label: "Role", minWidth: 100},
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
        columns: "name,phone,email",
        search: "",
        order: "id",
        sort: "ASC",
        value: "",
        start_date: "",
        end_date: "",
    },
};
