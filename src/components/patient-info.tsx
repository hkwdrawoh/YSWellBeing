import React, {useState} from "react";
import {patientIDs} from "@/constants/patients";
import {formatDate, formatName} from "@/components/functions";


export default function PatientInfo() {

    const [patientID, setPatientID] = useState("");
    const [msg, setMsg] = useState("")
    const [correctID, setcorrectID] = useState(false)

    const handleInput = (e) => {
        setMsg("")
        setPatientID(e.target.value);
    }

    function searchPatient() {
        // @ts-ignore
        if (String(patientID).length !== 7) {
            setMsg("Invalid Patient ID.")
        } else if (!patientIDs.find((a) => a === patientID)) {
            setMsg("Patient ID not found.")
        } else {
            setcorrectID(true)
        }
    }

    if (correctID) {
        return <>
            <div className="grid grid-cols-10 text-left p-4">
                <span className="font-bold col-span-3 py-2">Patient ID:</span>
                <span className="col-span-4 py-2">{patientID}</span>
                <button
                    className="col-span-3 text-center bg-primary rounded-lg border-background1 border-2"
                    onClick={() => setcorrectID(false)}
                >
                    <span className="text-text2">Back</span>
                </button>

                <span className="font-bold col-span-3 py-2">Name:</span>
                <span className="col-span-7 py-2">YEEEE</span>

                <span className="font-bold col-span-3 py-2">Last Visit:</span>
                <span className="col-span-7 py-2">AHHHHH</span>

                <span className="font-bold col-span-3 py-2">Symptom:</span>
                <span className="col-span-7 py-2">YOOOOO</span>

            </div>
        </>
    } else {
        return <>
            <div className="grid px-4 py-8 text-left gap-y-4">
                <span className="text-xl font-bold">Please enter Patient ID:</span>
                <input className="p-2 border-black border-2 rounded-lg" type="tel" value={patientID} onChange={handleInput}/>
                <div className="grid gap-y-4">
                    <button className="bg-primary text-text2 w-2/3 text-xl font-bold py-2 rounded-lg mt-4 mx-auto" onClick={searchPatient}>Enter</button>
                    <span className="text-center text-section2 text-lg">{msg}</span>
                </div>
            </div>
        </>
    }
}