import {formatDate, formatName} from "@/components/functions";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";


export default function IntakeReminder(props: {
    patientData: Object
    setPData: Function
    goToPage: Function
    setHerbIndex: Function
}) {
    // @ts-ignore
    const personal_info = props.patientData.PersonalInfo;
    // @ts-ignore
    const current_treatment = props.patientData.CurrentTreatment;
    const today = new Date();

    const [section, setSection] = useState('next');
    const [intake, setIntake] = useState([-1, -1]);
    const scrollToRef = useRef(null);

    useEffect(() => {
        if (scrollToRef.current) {
            // @ts-ignore
            scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
        }
        setIntake([-1, -1]);
    }, [section])


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
                {current_treatment.Prescriptions.map((day, day_index) => (
                    <div ref={day.Date === formatDate(today) ? scrollToRef : null} className="min-w-[9em] min-h-[13em] py-2 px-2 m-2 bg-background2 rounded-lg">
                        <span className="text-3xl">{day.Date.split(" ")[0]}</span>
                        <br />
                        <span className="text-lg">{day.Date.split(" ")[1] + " " + day.Date.split(" ")[2]}</span>

                        <div className="mt-2">
                            <span className="underline">Intakes</span>
                            {day.Intakes.map((intake, intake_index) => (
                                <button
                                    className={`grid grid-cols-5 mt-2 px-2 ${intake.Remarks === "" ? "bg-option4" : intake.Remarks === "Expected" ? "bg-option0" : "bg-option2"} rounded-lg w-full`}
                                    onClick={() => setIntake([day_index, intake_index])}
                                >
                                    <span>{intake_index + 1}</span>
                                    <span className="col-span-4">{intake.Remarks === "" ? "Done" : intake.Remarks === "Expected" ? "Upcoming" : "Skipped"}</span>
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
                        <span className="text-xl font-bold">{current_treatment.Prescriptions[intake[0]].Date} - Intake {intake[1] + 1}</span>
                        <div className="grid py-4">
                            {current_treatment.Prescriptions[intake[0]].Intakes[intake[1]].Remarks === "" ?
                                <>
                                    <span className="text-lg">Intake done!</span>
                                    <span className="text-lg">Time: {current_treatment.Prescriptions[intake[0]].Intakes[intake[1]].Time}</span>
                                </>
                                : current_treatment.Prescriptions[intake[0]].Intakes[intake[1]].Remarks === "Expected" ?
                                <>
                                    <span className="text-lg">Intake upcoming...</span>
                                    <span className="text-lg">Expected Time: {current_treatment.Prescriptions[intake[0]].Intakes[intake[1]].Time}</span>
                                </>
                                :
                                <>
                                    <span className="text-lg">Intake skipped!</span>
                                    <span className="text-lg">Reason: {current_treatment.Prescriptions[intake[0]].Intakes[intake[1]].Remarks}</span>
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

            <div className="grid p-4 gap-y-2">
                <span className="text-xl">{formatDate(today)} ({today.toLocaleDateString("en-UK", { weekday: 'long' })})</span>
                <span className="text-2xl font-bold">Intake for Today</span>
                <span className="text-2xl font-bold">20:00</span>
            </div>

            <div className="grid p-4 gap-y-4">
                <button
                    className="text-center border-primary rounded-lg bg-option4 border-2 text-xl w-3/4 mx-auto py-2"
                    onClick={() => setSection("next")}
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
        </>}

    </>
}