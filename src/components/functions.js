export function formatName(personal_info) {
    return personal_info.Title + " " + personal_info.FirstName + " " + personal_info.Surname
}

export function formatDate(isoDate) {
    if (isoDate === "") return "---"
    const date = new Date(isoDate);
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    return date.toLocaleDateString('en-UK', options)
}