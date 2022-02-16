/**
 * @param date
 * @param displayTime
 */
export function displayDate(date, displayTime = false){
    let newDate = date;
    if(!(newDate instanceof Date)) newDate = new Date(newDate);
    return newDate.toLocaleDateString() + (displayTime ? ` ${newDate.toLocaleTimeString()}` : '');
}