export const formatDate = (dateString) => {
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1].padStart(2, '0'); 
    const day = dateParts[2].padStart(2, '0');
    return `${year}-${month}-${day}`;
}