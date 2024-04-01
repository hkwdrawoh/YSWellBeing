import {formatDate, formatName, formatTime} from "@/components/functions";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";


export default function IntakeReminder(props: {
    patientData: Object
    setPData: Function
    goToPage: Function
    setHerbIndex: Function
    intakeComplete: boolean
    setIntakeComplete: Function
}) {
    const today = new Date();
    // @ts-ignore
    const personal_info = props.patientData.PersonalInfo;
    // @ts-ignore
    const current_treatment = props.patientData.CurrentTreatment;
    // @ts-ignore
    const prescriptions = current_treatment.Prescriptions;
    const today_prescription_index = prescriptions.map((a) => a[0].Date).indexOf(formatDate(today));
    const today_remaining_prescriptions = prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected");

    const [section, setSection] = useState('next');
    const [intake, setIntake] = useState([-1, -1]);
    const scrollToRef = useRef(null);

    useEffect(() => {
        if (scrollToRef.current) {
            // @ts-ignore
            scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        }
        if (section === 'next') {
            setIntake([-1, -1]);
        }
    }, [section])

    useEffect(() => {
        if (props.intakeComplete) {
            props.setIntakeComplete(false);
        }
    }, [props.intakeComplete])

    function toTodaySchedule() {
        setIntake([today_prescription_index, 0]);
        setSection('schedule');
    }

    return <>
        <div className="px-4">
            <div className="grid grid-cols-10 text-left py-4">
                <span className="font-bold col-span-3 py-2">Name:</span>
                <span className="col-span-7 py-2">{formatName(personal_info)}</span>

                <span className="font-bold col-span-3 py-2">Last Visit:</span>
                <span className="col-span-7 py-2">{formatDate(current_treatment.LastVisit)}</span>

                <span className="font-bold col-span-3 py-2">Symptom:</span>
                <span className="col-span-5 py-2">{current_treatment.SymptomEN} ({current_treatment.SymptomTC})</span>
                <button
                    className="col-span-2 text-center bg-primary rounded-lg border-primary border-2"
                    onClick={() => props.goToPage("symptom", "reminder")}
                >
                    <span className="text-text2">Details</span>
                </button>
            </div>

            <div className="grid grid-cols-2 py-2">
                <button
                    className={`text-center border-primary rounded-lg ${section === "next" ? "bg-primary" : "bg-background1"} border-2 text-xl w-3/4 mx-auto py-1`}
                    onClick={() => setSection("next")}
                >
                    <span className={section === "next" ? "text-text2" : "text-text1"}>Next Intake</span>
                </button>
                <button
                    className={`text-center border-primary rounded-lg ${section === "schedule" ? "bg-primary" : "bg-background1"} border-2 text-xl w-3/4 mx-auto py-1`}
                    onClick={() => setSection("schedule")}
                >
                    <span className={section === "schedule" ? "text-text2" : "text-text1"}>Schedule</span>
                </button>
            </div>
        </div>

        {section === "schedule" ? <>

            <div className="px-4 grid grid-flow-col auto-cols-max overflow-x-scroll">
                {prescriptions.map((day, day_index) => (
                    <div ref={day[0].Date === formatDate(today) ? scrollToRef : null} className="min-w-[9em] min-h-[13em] py-2 px-2 m-2 bg-background2 rounded-lg">
                        <span className="text-3xl">{day[0].Date.split(" ")[0]}</span>
                        <br />
                        <span className="text-lg">{day[0].Date.split(" ")[1] + " " + day[0].Date.split(" ")[2]}</span>

                        <div className="mt-2">
                            <span className="underline">Intakes</span>
                            {day.map((intake, intake_index) => (
                                <button
                                    className={`grid grid-cols-5 mt-2 px-2 ${intake.Remarks === "" ? "bg-option4" : intake.Remarks === "Expected" ? "bg-option0" : "bg-option2"} rounded-lg w-full`}
                                    onClick={() => setIntake([day_index, intake_index])}
                                >
                                    <span>{intake_index + 1}</span>
                                    <span className="col-span-4">{intake.Remarks === "" ? "Done" : intake.Remarks === "Expected" ? "No Record" : "Skipped"}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid px-4 py-4">
                {intake[0] === -1 ?
                    <span className="text-xl font-bold">Click on the intake to show details.</span>
                    :
                    <>
                        <span className="text-xl font-bold">Intake Information:</span>
                        <span className="text-xl font-bold">{prescriptions[intake[0]][0].Date} - Intake {prescriptions[intake[0]][intake[1]].Intake}</span>
                        <div className="grid py-4">
                            {prescriptions[intake[0]][intake[1]].Remarks === "" ?
                                <>
                                    <span className="text-lg">Intake done!</span>
                                    <span className="text-lg">Time: {prescriptions[intake[0]][intake[1]].Time}</span>
                                </>
                                : prescriptions[intake[0]][intake[1]].Remarks === "Expected" ?
                                <>
                                    <span className="text-lg">Intake upcoming...</span>
                                    <span className="text-lg">Expected Time: {prescriptions[intake[0]][intake[1]].Time}</span>
                                </>
                                :
                                <>
                                    <span className="text-lg">Intake skipped!</span>
                                    <span className="text-lg">Reason: {prescriptions[intake[0]][intake[1]].Remarks}</span>
                                </>
                            }
                        </div>
                    </>
                }
            </div>

        </> : <>

            <div className="min-w-full relative py-12 mt-2">
                <span></span>
                <Image src={`./prescription.jpeg`} fill={true} alt="image" style={{objectFit: "cover"}}/>
            </div>

            {today_remaining_prescriptions[0] ?
                <>
                    <div className="grid p-4 gap-y-2">
                        <span className="text-xl">{formatDate(today)} ({today.toLocaleDateString("en-UK", { weekday: 'long' })})</span>
                        <span className="text-2xl font-bold">Intake {today_remaining_prescriptions[0].Intake} for Today</span>
                        <span className="text-2xl font-bold">{today_remaining_prescriptions[0].Time}</span>
                    </div>

                    <div className="grid p-4 gap-y-4">
                        <button
                            className="text-center border-primary rounded-lg bg-option4 border-2 text-xl w-3/4 mx-auto py-2"
                            onClick={() => props.goToPage("intake", "reminder")}
                        >
                            <span className="">Intake Now</span>
                        </button>
                        <button
                            className="text-center border-primary rounded-lg bg-option3 border-2 text-xl w-3/4 mx-auto py-2"
                            onClick={() => setSection("next")}
                        >
                            <span className="">Delay Intake</span>
                        </button>
                        <button
                            className="text-center border-primary rounded-lg bg-option2 border-2 text-xl w-3/4 mx-auto py-2"
                            onClick={() => setSection("next")}
                        >
                            <span className="">Skip Intake</span>
                        </button>
                    </div>
                </>
                :
                <>
                    <div className="grid p-4 gap-y-2">
                        <span className="text-xl">{formatDate(today)} ({today.toLocaleDateString("en-UK", { weekday: 'long' })})</span>
                        <span className="text-2xl font-bold">Today's Intakes are Completed!</span>
                    </div>

                    <div className="grid p-4 gap-y-4">
                        <button
                            className="text-center border-primary rounded-lg bg-option4 border-2 text-xl w-3/4 mx-auto py-2"
                            onClick={() => toTodaySchedule()}
                        >
                            <span className="">View Today's Record</span>
                        </button>
                    </div>
                </>
             }
        </>}

    </>
}