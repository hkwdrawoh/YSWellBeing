import React, {useEffect, useState} from "react";
import CurrentTreatment from "@/components/treatment";
import Login from "@/components/login";
import PID0000000 from "@/constants/0000000.json"
import PID0002357 from "@/constants/0002357.json"
import PID0004689 from "@/constants/0004689.json"
import PID9999999 from "@/constants/9999999.json"
import {formatDate, formatName} from "@/components/functions";


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
    }, [])

    switch (props.page) {
        case "hi":
            return

        case "login":
            return <Login setPatientID={setPatientID} setPage={props.setPage} />

        case "treatment":
            return <CurrentTreatment setPage={props.setPage} patientData={patientData} />

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
                    // onClick={() => props.setPage("hi")}
                >
                    <span className="text-text2 text-xl text-left underline">Next Intake</span>
                    <span className="text-text2 text-lg">Reminder in: - hr -- min</span>
                </button>

                <button
                    className="text-center my-5 grid gap-x-4 gap-y-4 bg-section2 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full"
                    onClick={() => props.setPage(patientID === "0000000" ? "login" : "treatment")}
                >
                    <span className="text-text2 text-xl text-left underline">Current Treatment</span>
                    <span className="text-text2 text-lg">{patientData.CurrentTreatment.SymptomEN} ({patientData.CurrentTreatment.SymptomTC})</span>
                </button>

                <button
                    className="text-center my-5 grid gap-x-4 gap-y-4 bg-section3 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full">
                    <span className="text-text2 text-xl text-left underline">Today’s Body Condition</span>
                    <span className="text-text2 text-lg">Condition not recorded!</span>
                </button>

                <button
                    className="text-center my-5 grid gap-x-4 gap-y-4 bg-section4 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full">
                    <span className="text-text2 text-xl text-left underline">My Recovery Progress</span>
                    <span className="text-text2 text-lg">&emsp;</span>
                </button>
            </div>
    }
}