export const formBuilder = (payload, fields) => {

    const formData = new FormData();

    Object.keys(fields).map((value) => {

        if(payload[value] !== null) {
            formData.append(value,payload[value]);
            return value;
        }

        return value;
    })

    formData.append('method', 'PUT');

    return formData;

}