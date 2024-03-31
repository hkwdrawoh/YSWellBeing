import Calendar from "react-calendar";
import {conditionScore, formatDate} from "@/components/functions";
import React, {useState} from "react";

export default function RecoveryProgress(props: {
    patientData: Object
}) {

    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
    const [currQ, setCurrQ] = useState(1);
    // @ts-ignore
    const body_conditions = props.patientData.BodyConditions;
    const dates_and_scores = body_conditions.map((a) => [a.RecordDate, conditionScore(a.Q2, a.Q3, a.Q4)])
    const selected_record = body_conditions.filter((a) => a.RecordDate === selectedDate);
    const record = selected_record[0];

    const Q2_options = ["Very Good 😆", "Good 🙂", "Average 😐", "Bad 🙁", "Very Bad 😵‍💫"];
    const Q3_options = ["Much Better 😆", "A Bit Better 🙂", "Similar 😐", "A Bit Worse 🙁", "Much Worse 😵‍💫"];
    const Q4_options = ["Much Less Severe 😆", "Less Severe 🙂", "Similar 😐", "More Severe 🙁", "Much More Severe 😵‍💫"];
    const Q5_options = ["Much Improved", "Improved", "Similar", "Worsened", "Much Worsened", "No Input"];

    const handleDateChange = (date) => {
        setSelectedDate(formatDate(date));
    }

    const tileClass = ({ activeStartDate, date, view }) =>
        view === 'month' && !dates_and_scores.filter((a) => a[0] === formatDate(date))[0] ? null :
            formatDate(date) === selectedDate ? null :
            dates_and_scores.filter((a) => a[0] === formatDate(date))[0][1] === 0 ? 'calendar-option0' :
            dates_and_scores.filter((a) => a[0] === formatDate(date))[0][1] === 1 ? 'calendar-option1' :
            dates_and_scores.filter((a) => a[0] === formatDate(date))[0][1] === 2 ? 'calendar-option2' :
            dates_and_scores.filter((a) => a[0] === formatDate(date))[0][1] === 3 ? 'calendar-option3' :
            dates_and_scores.filter((a) => a[0] === formatDate(date))[0][1] === 4 ? 'calendar-option4' : 'calendar-option5'

    switch (currQ) {
        case 5:
            return <>
                <div className="grid text-left p-4 gap-y-4">
                    <div>
                        <span className="text-xl font-bold">{selectedDate}</span>
                    </div>

                    <div className="grid grid-cols-3">
                        <span className={`text-xl font-bold col-span-2 px-4 py-1 ${("bg-option" + String(conditionScore(record.Q2, record.Q3, record.Q4)))} mr-auto rounded-3xl`}>{Q5_options[5 - conditionScore(record.Q2, record.Q3, record.Q4)]}</span>
                        <button
                            className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-3/5"
                            onClick={() => setCurrQ(1)}
                        >
                            <span className="text-text1 text-lg">Back</span>
                        </button>
                    </div>

                    <div className="grid gap-y-3 py-4">
                        <span className="text-xl font-bold">Your Record:</span>
                        <div className="grid grid-cols-2 text-center items-center gap-x-4">
                            <div className="grid grid-cols-3 pl-2 py-2 items-center bg-background2 rounded-xl">
                                <span className="row-span-2">Weight</span>
                                <div className="col-span-2 grid grid-cols-7 items-center w-2/3 mx-auto">
                                    <span className="text-option0 text-xs">|</span><span className="text-sm">|</span><span className="text-base">|</span><span className="text-lg text-section2">|</span><span className="text-base">|</span><span className="text-sm">|</span><span className="text-xs text-option0">|</span>
                                </div>
                                <span className="col-span-2">{record.Q1a === 0 ? "--" : record.Q1a} kg</span>
                            </div>
                            <div className="grid grid-cols-3 pl-2 py-2 items-center bg-background2 rounded-xl">
                                <span className="row-span-2">Blood Pressure</span>
                                <div className="col-span-2 grid grid-cols-7 items-center w-2/3 mx-auto">
                                    <span className="text-option0 text-xs">|</span><span className="text-sm">|</span><span className="text-base">|</span><span className="text-lg text-section2">|</span><span className="text-base">|</span><span className="text-sm">|</span><span className="text-xs text-option0">|</span>
                                </div>
                                <span className="col-span-2">{record.Q1b === 0 ? "--" : record.Q1b} / {record.Q1c === 0 ? "--" : record.Q1c}</span>
                            </div>
                        </div>

                        <span className="text-lg">How are you feeling today?</span>
                        <span className={`mx-auto py-1 ${"bg-option" + String(record.Q2)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{record.Q2 === 0 ? "Not Answered" : Q2_options[5 - record.Q2]}</span>

                        <span className="text-lg">Compare to yesterday, you are feeling...</span>
                        <span className={`mx-auto py-1 ${"bg-option" + String(record.Q3)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{record.Q3 === 0 ? "Not Answered" : Q3_options[5 - record.Q3]}</span>

                        <span className="text-lg">Compare to yesterday, your symptoms are...</span>
                        <span className={`mx-auto py-1 ${"bg-option" + String(record.Q4)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{record.Q4 === 0 ? "Not Answered" : Q4_options[5 - record.Q4]}</span>

                    </div>

                    <div className="grid">
                        <button
                            className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-3/4"
                            onClick={() => setCurrQ(6)}
                        >
                            <span className="text-text1 text-lg">View Doctor's Comment</span>
                        </button>
                    </div>

                </div>
            </>

        case 6:
            return <>
                <div className="grid text-left p-4 gap-y-4">

                    <div className="grid grid-cols-3">
                        <span className="text-xl font-bold col-span-2">{selectedDate}</span>
                        <button
                            className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-3/5"
                            onClick={() => setCurrQ(5)}
                        >
                            <span className="text-text1 text-lg">Back</span>
                        </button>
                    </div>
                    <br />
                    <span className="text-lg font-bold">Dr CHAN Hiu Ming:</span>
                    <span className="bg-white border-black border-2 rounded-lg p-2">{record.Comment === "" ? "No comment yet..." : record.Comment}</span>
                </div>
            </>

        default:
            return <>
                <div className="grid p-4 gap-y-4">
                    <span className="text-xl font-bold text-left">Choose the Date:</span>
                    <Calendar
                        className="mx-auto"
                        onChange={handleDateChange}
                        calendarType="gregory"
                        locale="en-UK"
                        tileClassName={tileClass}
                        defaultValue={new Date(selectedDate)}
                        minDetail="month"
                    />
                    <div className="grid grid-cols-3">
                        <span className="text-xl font-bold text-left col-span-2">Selected Date: {selectedDate}</span>
                        <button
                            className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-full disabled:bg-option0"
                            onClick={() => setCurrQ(5)}
                            disabled={!selected_record[0]}
                        >
                            <span className="text-text1 text-lg">{selected_record[0] ? "View" : "No record available"}</span>
                        </button>
                    </div>
                </div>
            </>
    }
}