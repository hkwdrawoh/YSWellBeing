import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {formatDate} from "@/components/functions";

export default function RecoveryProgress() {

    const handleDateChange = (date) => {
        console.log(formatDate(date));
    }

    return <>
        <div className="grid p-4 gap-y-4">
            <span className="text-xl font-bold text-left">Choose the Date:</span>
            <Calendar className="mx-auto" onChange={handleDateChange}/>
        </div>
    </>
}