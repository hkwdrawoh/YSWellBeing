import React, {useEffect, useState} from "react";
import Login from "@/components/login";
import IntakeReminder from "@/components/reminder";
import CurrentTreatment from "@/components/treatment";
import TodayCondition from "@/components/condition";
import RecoveryProgress from "@/components/progress";
import AdminPage from "@/components/admin";
import {formatDate, formatName} from "@/components/functions";

import PID0000000 from "@/constants/0000000.json"
import PID0002357 from "@/constants/0002357.json"
import PID0004689 from "@/constants/0004689.json"
import PID9999999 from "@/constants/9999999.json"


export default function MainMenu(props: {
    page: string
    setPage: Function
}) {
    const Data_0000000 = PID0000000.data;
    const Data_0002357 = PID0002357.data;
    const Data_0004689 = PID0004689.data;
    const Data_9999999 = PID9999999.data;

    const [patientID, setPID] = useState("");
    const [patientData, setPData] = useState(Data_0000000);

    function loginPressed() {
        if (patientID === "0000000") {
            props.setPage("login")
        } else {
            setPatientID("0000000")
            props.setPage("home")
        }
    }

    function setPatientID(id) {
        localStorage.setItem("YSWB:patientId", id)
        const userData = localStorage.getItem("YSWB:ID=" + id)
        if (!userData) {
            setPData(eval('Data_' + id))
            localStorage.setItem("YSWB:ID=" + id, JSON.stringify(eval('Data_' + id)))
        } else {
            setPData(JSON.parse(userData))
        }
        setPID(id)
    }

    useEffect(() => {
        if (typeof window === "undefined") {
            setPatientID("0000000")
        }
        const userId = localStorage.getItem("YSWB:patientId")
        if (!userId) {
            localStorage.setItem("YSWB:patientId", "0000000")
            setPatientID("0000000")
        } else {
            setPatientID(userId)
        }
        if (userId === "9999999") {
            props.setPage("admin")
        }
    }, [])

    // @ts-ignore
    let todays_record = patientData.BodyConditions.filter((a) => a.RecordDate === formatDate(new Date()));

    switch (props.page) {
        case "login":
            return <Login setPatientID={setPatientID} setPage={props.setPage} />

        case "reminder":
            return <IntakeReminder patientData={patientData} setPData={setPData} />

        case "treatment":
            return <CurrentTreatment setPage={props.setPage} patientData={patientData} />

        case "condition":
            return <TodayCondition patientData={patientData} setPData={setPData}/>

        case "progress":
            return <RecoveryProgress patientData={patientData} />

        case "admin":
            return <AdminPage loginPressed={loginPressed} />

        default:
            return <div className="px-4 pt-4">
                <div className="grid grid-cols-4">
                    <div className="col-span-3 text-left">
                        <span className="text-xl">Hello, {formatName(patientData.PersonalInfo)}</span>
                        <br />
                        <span className="text-md">Last clinic visit: {formatDate(patientData.CurrentTreatment.LastVisit)}</span>
                    </div>
                    <button
                        className="text-center my-auto grid items-center justify-center gap-x-4 gap-y-8 bg-primary rounded-lg border-section1 border-opacity-50 border-2 w-full h-3/4"
                        onClick={loginPressed}
                    >
                        <span className="text-text2">{patientID === "0000000" ? "Login" : "Logout"}</span>
                    </button>
                </div>

                <button
                    className="text-center my-5 grid gap-x-4 gap-y-4 bg-section1 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full"
                    onClick={() => props.setPage(patientID === "0000000" ? "login" : "reminder")}
                >
                    <span className="text-text2 text-xl text-left underline">Next Intake</span>
                    <span className="text-text2 text-lg">
                        {`Next Reminder:\u00A0
                        ${patientID === "0000000" ? "N/A" :
                        !patientData.CurrentTreatment.Prescriptions.filter((a) => a.Date === formatDate(new Date()))[0] ? "No Reminders for Today" :
                        !patientData.CurrentTreatment.Prescriptions.filter((a) => a.Date === formatDate(new Date()))[0].Intakes.filter((a) => a.Remarks === "Expected")[0] ? "No Reminders for Today" :
                        patientData.CurrentTreatment.Prescriptions.filter((a) => a.Date === formatDate(new Date()))[0].Intakes.filter((a) => a.Remarks === "Expected")[0].Time}`}
                    </span>
                </button>

                <button
                    className="text-center my-5 grid gap-x-4 gap-y-4 bg-section2 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full"
                    onClick={() => props.setPage(patientID === "0000000" ? "login" : "treatment")}
                >
                    <span className="text-text2 text-xl text-left underline">Current Treatment</span>
                    <span className="text-text2 text-lg">{patientID === "0000000" ? "Login to view your treatment." : patientData.CurrentTreatment.SymptomEN + " (" + patientData.CurrentTreatment.SymptomTC + ")"}</span>
                </button>

                <button
                    className="text-center my-5 grid gap-x-4 gap-y-4 bg-section3 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full"
                    onClick={() => props.setPage(patientID === "0000000" ? "login" : "condition")}
                >
                    <span className="text-text2 text-xl text-left underline">Today’s Body Condition</span>
                    <span className="text-text2 text-lg">{patientID === "0000000" ? "Login to record your condition." : (todays_record[0] ? "Recorded, thank you!" : "Condition not recorded!")}</span>
                </button>

                <button
                    className="text-center my-5 grid gap-x-4 gap-y-4 bg-section4 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full"
                    onClick={() => props.setPage(patientID === "0000000" ? "login" : "progress")}
                >
                    <span className="text-text2 text-xl text-left underline">My Recovery Progress</span>
                    <span className="text-text2 text-lg">&emsp;</span>
                </button>

                <span className="bg-option0"></span>
                <span className="bg-option1"></span>
                <span className="bg-option2"></span>
                <span className="bg-option3"></span>
                <span className="bg-option4"></span>
                <span className="bg-option5"></span>
            </div>
    }
}