export function formatName(personal_info) {
    return personal_info.Title + " " + personal_info.FirstName + " " + personal_info.Surname
}

export function formatDate(isoDate) {
    if (isoDate === "") return "---"
    const date = new Date(isoDate);
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    return date.toLocaleDateString('en-UK', options)
}

export function formatTime(isoDate) {
    if (isoDate === "") return "---"
    const date = new Date(isoDate);
    const options = {hour: "2-digit", minute: "2-digit"}
    return date.toLocaleTimeString('en-UK', options)
}

export function conditionScore(Q2, Q3, Q4) {
    let numerator = Q2 + Q3 + Q4;
    if (numerator === 0) {return 0}
    let denominator = Math.sign(Q2) + Math.sign(Q3) + Math.sign(Q4);
    return Math.round(numerator / denominator)
}
