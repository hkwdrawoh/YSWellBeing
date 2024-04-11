import {formatDate, formatName, formatTime} from "@/components/functions";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import * as Collapsible from "@radix-ui/react-collapsible";
import Subscriber from "@/components/subscriber";
import {State} from "@/pages";


export default function IntakeReminder(props: {
    patientData: Object
    setPData: Function
    goToPage: Function
    setHerbIndex: Function
    intakeComplete: boolean
    setIntakeComplete: Function
    state: State
    setState: React.Dispatch<React.SetStateAction<State>>
}) {
    const today = new Date();
    // @ts-ignore
    const personal_info = props.patientData.PersonalInfo;
    // @ts-ignore
    const current_treatment = props.patientData.CurrentTreatment;
    // @ts-ignore
    const prescriptions = current_treatment.Prescriptions;
    const today_prescription_index = prescriptions.map((a) => a[0].Date).indexOf(formatDate(today));

    const [section, setSection] = useState('next');
    const [intake, setIntake] = useState([-1, -1]);
    const [delayFooterOpen, setDelayFooterOpen] = useState(false);
    const [skipFooterOpen, setSkipFooterOpen] = useState(false);
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
            let intake = prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected")[0].Intake;
            saveRecord(today_prescription_index, intake, formatTime(today), "");
        }
    }, [props.intakeComplete])

    function toTodaySchedule() {
        setIntake([today_prescription_index, 0]);
        setSection('schedule');
    }

    function openDelayIntake() {
        setDelayFooterOpen(true);
        setSkipFooterOpen(false);
    }

    function openSkipIntake() {
        setSkipFooterOpen(true);
        setDelayFooterOpen(false);
    }

    function delayIntake(delayTime) {
        let intake = prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected")[0].Intake;
        let time = prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected")[0].Time;
        let datetime = new Date("1 Apr 2024 " + time);
        let new_time = formatTime(new Date(datetime.getTime() + delayTime * 60000));
        setDelayFooterOpen(false);
        saveRecord(today_prescription_index, intake, new_time, "Expected");
    }

    function skipIntake(reason) {
        let intake = prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected")[0].Intake;
        let time = prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected")[0].Time;
        setSkipFooterOpen(false);
        saveRecord(today_prescription_index, intake, time, reason);
    }

    function saveRecord(date_index, intake, time, remarks) {
        let new_Prescriptions = JSON.parse(JSON.stringify(prescriptions));
        new_Prescriptions[date_index][intake-1].Time = time;
        new_Prescriptions[date_index][intake-1].Remarks = remarks;
        // @ts-ignore
        let new_PData = {...props.patientData, "CurrentTreatment": {...props.patientData.CurrentTreatment, "Prescriptions": new_Prescriptions }};
        props.setPData(new_PData);
        // @ts-ignore
        localStorage.setItem("YSWB:ID=" + props.patientData.PatientID, JSON.stringify(new_PData))
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
                    <div key={day_index} ref={day[0].Date === formatDate(today) ? scrollToRef : null} className="min-w-[9em] min-h-[13em] py-2 px-2 m-2 bg-background2 rounded-lg">
                        <span className="text-3xl">{day[0].Date.split(" ")[0]}</span>
                        <br />
                        <span className="text-lg">{day[0].Date.split(" ")[1] + " " + day[0].Date.split(" ")[2]}</span>

                        <div className="mt-2">
                            <span className="underline">Intakes</span>
                            {day.map((intake, intake_index) => (
                                <button
                                    key={day_index + " " + intake_index}
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
            <div className="grid px-4 py-4 gap-y-4">
                {intake[0] === -1 ?
                    <span className="text-xl font-bold">Click on the intake to show details.</span>
                    :
                    <div className="grid">
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
                    </div>
                }
            </div>

        </> : <>

            <div className="min-w-full relative py-12 mt-2">
                <span></span>
                <Image src={`./prescription.jpeg`} fill={true} alt="image" style={{objectFit: "cover"}}/>
            </div>

            {today_prescription_index === -1 ?
                <>
                    <div className="grid p-4 gap-y-2">
                        <span className="text-xl">{formatDate(today)} ({today.toLocaleDateString("en-UK", { weekday: 'long' })})</span>
                        <span className="text-2xl font-bold">No Intakes for Today!</span>
                    </div>

                    <div className="grid p-4 gap-y-4">
                        <button
                            className="text-center border-primary rounded-lg bg-option4 border-2 text-xl w-3/4 mx-auto py-2"
                            onClick={() => setSection('schedule')}
                        >
                            <span className="">View Past Records</span>
                        </button>
                    </div>
                </>
                : prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected")[0] ?
                <>
                    <div className="grid p-4 gap-y-2">
                        <span className="text-xl">{formatDate(today)} ({today.toLocaleDateString("en-UK", { weekday: 'long' })})</span>
                        <span className="text-2xl font-bold">Intake {prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected")[0].Intake} for Today</span>
                        <span className="text-2xl font-bold">{prescriptions[today_prescription_index].filter((a) => a.Remarks === "Expected")[0].Time}</span>
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
                            onClick={() => openDelayIntake()}
                        >
                            <span className="">Delay Intake</span>
                        </button>
                        <button
                            className="text-center border-primary rounded-lg bg-option2 border-2 text-xl w-3/4 mx-auto py-2"
                            onClick={() => openSkipIntake()}
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
             
            <div className="p-4">
                <Subscriber state={props.state} setState={props.setState} />
            </div>

        </>}

        <DelayFooter open={delayFooterOpen} setOpen={setDelayFooterOpen} delayIntake={delayIntake} />
        <SkipFooter open={skipFooterOpen} setOpen={setSkipFooterOpen} skipIntake={skipIntake} />

    </>
}


function DelayFooter(props: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    delayIntake: Function
}) {
    const [delayTime, setDelayTime] = useState(15);

    return (
        // @ts-ignore
        <footer ref={props.footerRef} className="flex-shrink-0 mx-[5%] w-[90%] max-w-[922px] fixed bottom-[2em]  bg-primary rounded-3xl">
            <Collapsible.Root
                className="h-full"
                open={props.open}
                onOpenChange={props.setOpen}
            >
                <Collapsible.Content>
                    <div className="flex flex-col gap-y-2 py-3 h-[16.5em] max-h-[16.5em]">
                        <div className="grid grid-cols-6">
                            <span> </span>
                            <span className="col-span-4 text-2xl font-bold">Delay Intake</span>
                            <button onClick={() => props.setOpen(false)}>X</button>
                        </div>
                        <div className="overflow-y-auto grid bg-background2 scrollbar-hide">
                            <button className={`py-1 text-xl ${delayTime === 5 ? "bg-background1" : ""}`}
                                    onClick={() => setDelayTime(5)}>5 min</button>
                            <button className={`py-1 text-xl ${delayTime === 10 ? "bg-background1" : ""}`}
                                    onClick={() => setDelayTime(10)}>10 min</button>
                            <button className={`py-1 text-xl ${delayTime === 15 ? "bg-background1" : ""}`}
                                    onClick={() => setDelayTime(15)}>15 min</button>
                            <button className={`py-1 text-xl ${delayTime === 20 ? "bg-background1" : ""}`}
                                    onClick={() => setDelayTime(20)}>20 min</button>
                            <button className={`py-1 text-xl ${delayTime === 25 ? "bg-background1" : ""}`}
                                    onClick={() => setDelayTime(25)}>25 min</button>
                            <button className={`py-1 text-xl ${delayTime === 30 ? "bg-background1" : ""}`}
                                    onClick={() => setDelayTime(30)}>30 min</button>
                        </div>
                        <div className="grid">
                            <button className="text-text2 text-xl font-bold" onClick={() => props.delayIntake(delayTime)}>Enter</button>
                        </div>
                    </div>
                </Collapsible.Content>
            </Collapsible.Root>
        </footer>
    )
}

function SkipFooter(props: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    skipIntake: Function
}) {
    const [reason, setReason] = useState("");

    useEffect(() => {
        if (!props.open) {
            setReason("");
        }
    }, [props.open])

    const handleInput = (e) => {setReason(e.target.value)}

    return (
        // @ts-ignore
        <footer ref={props.footerRef} className="flex-shrink-0 mx-[5%] w-[90%] max-w-[922px] fixed bottom-[2em]  bg-primary rounded-3xl">
            <Collapsible.Root
                className="h-full"
                open={props.open}
                onOpenChange={props.setOpen}
            >
                <Collapsible.Content>
                    <div className="flex flex-col gap-y-2 py-3 h-[16.5em] max-h-[16.5em]">
                        <div className="grid grid-cols-6">
                            <span> </span>
                            <span className="col-span-4 text-2xl font-bold">Reason to Skip</span>
                            <button onClick={() => props.setOpen(false)}>X</button>
                        </div>
                        <div className="overflow-y-auto grid bg-background2 scrollbar-hide h-full">
                            <textarea value={reason} onChange={handleInput} className="m-2 p-2 border-black border-2 rounded-xl" />
                        </div>
                        <div className="grid">
                            <button className="text-text2 text-xl font-bold" onClick={() => props.skipIntake(reason)}>Enter</button>
                        </div>
                    </div>
                </Collapsible.Content>
            </Collapsible.Root>
        </footer>
    )
}
