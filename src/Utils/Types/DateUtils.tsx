
export function isDateInInterval(date: Date, dateDebut: Date | null, dateFin: Date | null) {
    if (dateDebut === null || dateFin === null) {
        return false;
    }
    return date.getTime() >= dateDebut.getTime() && date.getTime() <= dateFin.getTime();
}

export function isToday(date: Date) {
    const today = new Date();
    return today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear();
}
export function isSameDay(date1: Date | null, date2: Date | null) {
    if (date1 === null || date2 === null) return false;
    return date1.getTime() === date2.getTime();
}
export function isBefore(date1: Date | null, date2: Date | null) {
    if (date1 === null || date2 === null) return false;
    return date1.getTime() < date2.getTime();
}

export function dateToStringFr(date: Date | null) {
    if (date === null) return "";
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function dateToExport(date: Date | null) {
    // dd/MM/yyyy
    if (date === null) return "";
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}