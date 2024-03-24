import React, {useEffect, useState} from "react";
import CurrentTreatment from "@/components/treatment";
import Login from "@/components/login";


export default function MainMenu(props: {
    page: string
    setPage: Function
}) {
    const [patientID, setPID] = useState("");

    function loginPressed() {
        if (patientID === "0000000") {
            props.setPage("login")
        } else {
            setPatientID("0000000")
        }
    }

    function setPatientID(id) {
        localStorage.setItem("YSWB:patientId", id)
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
            return <CurrentTreatment setPage={props.setPage} />

        default:
            return <div className="px-4 pt-4">
                <div className="grid grid-cols-4">
                    <div className="col-span-3 text-left">
                        <span className="text-xl">Hello, {patientID}</span>
                        <br />
                        <span className="text-md">Last clinic visit: 22 Feb 2024</span>
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
                    <span className="text-text2 text-lg">Reminder in: 3 hr 40 min</span>
                </button>

                <button
                    className="text-center my-5 grid gap-x-4 gap-y-4 bg-section2 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full"
                    onClick={() => props.setPage(patientID === "0000000" ? "login" : "treatment")}
                >
                    <span className="text-text2 text-xl text-left underline">Current Treatment</span>
                    <span className="text-text2 text-lg">Blood Vacuity (血虛)</span>
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