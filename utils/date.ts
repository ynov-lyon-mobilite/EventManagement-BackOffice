/**
 * @param date
 */
export function displayDate(date){
    let newDate = date;
    if(!(newDate instanceof Date)) newDate = new Date(newDate);
    return newDate.toLocaleDateString();
}