import React, {useEffect, useState} from "react";
import {patientIDs, replyList} from "@/constants/patients";
import {formatDate} from "@/components/functions";
import Image from "next/image";


export default function PatientInfo() {

    const [patientID, setPatientID] = useState("");
    const [msg, setMsg] = useState("");
    const [correctID, setCorrectID] = useState(false);
    const [caseNum, setCaseNum] = useState("0");
    const [condition, setCondition] = useState(false);

    const handleInput = (e) => {
        setMsg("")
        setPatientID(e.target.value);
    }

    useEffect(() => {
        setCaseNum("0")
    }, [correctID])

    function searchPatient() {
        // @ts-ignore
        if (String(patientID).length !== 7) {
            setMsg("Invalid Patient ID.")
        } else if (!patientIDs.find((a) => a === patientID)) {
            setMsg("Patient ID not found.")
        } else {
            setCorrectID(true)
        }
    }

    if (correctID) {
        let patientInfo = replyList.find((a) => a.ID === patientID) || {
            ID: null,
            CaseNum: "9",
            Name: null,
            LastVisit: "29 Feb 2024",
            Symptom: null
        }

        if (condition) {
            return <>
                <div className="mx-auto px-2 py-4 grid grid-cols-5 gap-y-4">
                    <span></span>
                    <span className="col-span-3 text-xl font-bold py-2">Body Condition</span>
                    <button
                        className="text-center bg-primary rounded-lg border-background1 border-2"
                        onClick={() => setCondition(false)}
                    >
                        <span className="text-text2">Back</span>
                    </button>
                    <Image src={"/info_score.jpeg"} alt={""} width={300} height={0} className="col-span-5 mx-auto"/>
                    <Image src={"/info_weight.jpeg"} alt={""} width={300} height={0} className="col-span-5 mx-auto"/>
                    <Image src={"/info_blood.jpeg"} alt={""} width={300} height={0} className="col-span-5 mx-auto"/>
                </div>
            </>
        } else {
            return <>
                <div className="grid grid-cols-10 text-left p-4">
                    <span className="font-bold col-span-3 py-2">Patient ID:</span>
                    <span className="col-span-4 py-2">{patientInfo.ID}</span>
                    <button
                        className="col-span-3 text-center bg-primary rounded-lg border-background1 border-2"
                        onClick={() => setCorrectID(false)}
                    >
                        <span className="text-text2">Back</span>
                    </button>

                    <span className="font-bold col-span-3 py-2">Name:</span>
                    <span className="col-span-7 py-2">{patientInfo.Name}</span>

                    <span className="font-bold col-span-3 py-2">Last Visit:</span>
                    <span className="col-span-7 py-2">{patientInfo.LastVisit}</span>

                    <span className="col-span-2 text-center font-bold py-2">Case ID</span>
                    <span className="col-span-5 text-center font-bold py-2">Symptoms</span>
                    <span className="col-span-3 text-center font-bold py-2">Last Visit</span>

                    <div className="grid col-span-10 gap-y-1 border-black border-2 p-1 -mx-2">
                        <button className={`grid grid-cols-10 py-2 ${caseNum === "1" ? "bg-background1 rounded-lg" : ""}`} onClick={() => setCaseNum("1")}>
                            <span className="col-span-2">{patientInfo.CaseNum}</span>
                            <span className="col-span-5">{patientInfo.Symptom}</span>
                            <span className="col-span-3">{patientInfo.LastVisit}</span>
                        </button>
                        <button className={`grid grid-cols-10 py-2 ${caseNum === "2" ? "bg-background1 rounded-lg" : ""}`} onClick={() => setCaseNum("2")}>
                            <span className="col-span-2">{Number(patientInfo.CaseNum) - 1}</span>
                            <span className="col-span-5">{patientInfo.Symptom}</span>
                            <span className="col-span-3">{formatDate(new Date(new Date(patientInfo.LastVisit).getTime() - 604800000))}</span>
                        </button>
                        <button className={`grid grid-cols-10 py-2 ${caseNum === "3" ? "bg-background1 rounded-lg" : ""}`} onClick={() => setCaseNum("3")}>
                            <span className="col-span-2">{Number(patientInfo.CaseNum) - 2}</span>
                            <span className="col-span-5">{patientInfo.Symptom}</span>
                            <span className="col-span-3">{formatDate(new Date(new Date(patientInfo.LastVisit).getTime() - 1209600000))}</span>
                        </button>
                    </div>

                    <div className="col-span-10 text-center pt-4 grid gap-y-2">
                        {caseNum === "0" ? <>
                            <span className="text-lg font-bold">Select the cases for details.</span>
                        </> : <>

                            <button className="w-3/4 bg-section1 text-text2 font-bold mx-auto p-2 rounded-lg" onClick={() => setCondition(true)}>Body Condition</button>
                        </>}
                    </div>

                </div>
            </>
        }
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