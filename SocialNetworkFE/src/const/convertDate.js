export const convertDate = (date) =>{{
    const inputDate = new Date(date);

    // Get day, month, and year components
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const year = inputDate.getFullYear();

    // Format the date as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate // Output: 12/10/2023
}};
