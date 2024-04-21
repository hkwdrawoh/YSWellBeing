import React, {useEffect, useState} from "react";
import {replyList} from "@/constants/patients";
import {formatDate} from "@/components/functions";
import PID0002357 from "@/constants/0002357.json"
import PID0004689 from "@/constants/0004689.json"


export default function ReplyPatient() {

    const today = new Date();
    const yesterday = formatDate(new Date(today.getTime() - 86400000));
    const [patientID, setPatientID] = useState("");
    const [commentSaved, setCommentSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [record, setRecord] = useState({
        "RecordDate": "",
        "Q1a": "",
        "Q1b": "",
        "Q1c": "",
        "Q2": 0,
        "Q3": 0,
        "Q4": 0,
        "Comment": ""
    });

    const Q2_options = ["Very Good 😆", "Good 🙂", "Average 😐", "Bad 🙁", "Very Bad 😵‍💫"];
    const Q3_options = ["Much Better 😆", "A Bit Better 🙂", "Similar 😐", "A Bit Worse 🙁", "Much Worse 😵‍💫"];
    const Q4_options = ["Much Less Severe 😆", "Less Severe 🙂", "Similar 😐", "More Severe 🙁", "Much More Severe 😵‍💫"];

    let storage_0002357 = localStorage.getItem("YSWB:ID=0002357");
    let Data_0002357 = storage_0002357 ? JSON.parse(storage_0002357) : PID0002357.data;
    let storage_0004689 = localStorage.getItem("YSWB:ID=0004689");
    let Data_0004689 = storage_0004689 ? JSON.parse(storage_0004689) : PID0004689.data;

    const handleInput = (e) => {
        setCommentSaved(false);
        setComment(e.target.value);
        setRecord({...record, "Comment": e.target.value});
    }

    useEffect(() => {
        if (patientID === "0002357") {
            setRecord(Data_0002357.BodyConditions.find((a) => a.RecordDate === yesterday));
            setComment(Data_0002357.BodyConditions.find((a) => a.RecordDate === yesterday).Comment)
        } else if (patientID === "0004689") {
            setRecord(Data_0004689.BodyConditions.find((a) => a.RecordDate === yesterday));
            setComment(Data_0004689.BodyConditions.find((a) => a.RecordDate === yesterday).Comment)
        }
    }, [])

    function saveRecord() {
        if (patientID === "0002357") {
            Data_0002357.BodyConditions = Data_0002357.BodyConditions.filter((a) => a.RecordDate !== yesterday);
            Data_0002357.BodyConditions.push(record);
            localStorage.setItem("YSWB:ID=0002357", JSON.stringify(Data_0002357));
            setCommentSaved(true);
        } else if (patientID === "0004689") {
            Data_0004689.BodyConditions = Data_0004689.BodyConditions.filter((a) => a.RecordDate !== yesterday);
            Data_0004689.BodyConditions.push(record);
            localStorage.setItem("YSWB:ID=0004689", JSON.stringify(Data_0004689));
            setCommentSaved(true);
        }
    }

    if (patientID === "") {
        return <>
            <div className="flex flex-col px-2 py-4 gap-y-4 h-[39em] max-h-[39em]">
                <div>
                    <span className="text-lg">Record for {yesterday}</span>
                </div>
                <div className="grid grid-cols-9">
                    <span className="font-bold col-span-2">ID</span>
                    <span className="font-bold col-span-2">Case No.</span>
                    <span className="font-bold col-span-3">Name</span>
                    <span className="font-bold col-span-2">Status</span>
                </div>
                <div className="overflow-y-scroll grid gap-y-1 border-black border-2 p-1">
                    {Data_0002357.BodyConditions.find((a) => a.RecordDate === yesterday) ?
                        <>
                            <button className="grid grid-cols-9 py-2 bg-background1 rounded-lg" onClick={() => setPatientID("0002357")}>
                                <span className="col-span-2">0002357</span>
                                <span className="col-span-2">23576</span>
                                <span className="col-span-3">Roger Chan</span>
                                {Data_0002357.BodyConditions.find((a) => a.RecordDate === yesterday).Comment ?
                                    <span className="col-span-2">Replied</span>
                                    :
                                    <span className="col-span-2 text-section2">No Reply</span>}
                            </button>
                        </> : <></>}
                    {Data_0004689.BodyConditions.find((a) => a.RecordDate === yesterday) ?
                        <>
                            <button className="grid grid-cols-9 py-2 bg-background1 rounded-lg" onClick={() => setPatientID("0004689")}>
                                <span className="col-span-2">0004689</span>
                                <span className="col-span-2">46893</span>
                                <span className="col-span-3">Natalie Lai</span>
                                {Data_0004689.BodyConditions.find((a) => a.RecordDate === yesterday).Comment ?
                                    <span className="col-span-2">Replied</span>
                                    :
                                    <span className="col-span-2 text-section2">No Reply</span>}
                            </button>
                        </> : <></>}
                    {replyList.filter((a) => a.ID !== "0002357" && a.ID !== "0004689").map((reply) => <>
                        <div className="grid grid-cols-9 py-2  rounded-lg">
                            <span className="col-span-2">{reply.ID}</span>
                            <span className="col-span-2">{reply.CaseNum}</span>
                            <span className="col-span-3">{reply.Name}</span>
                            <span className="col-span-2">Replied</span>
                        </div>
                    </>)}
                </div>
            </div>
        </>
    } else {
        return <>
            <div className="grid text-left p-4 gap-y-2">
                <div className="grid grid-cols-3 items-center">
                    <span className="text-xl font-bold col-span-2">{patientID}: {yesterday}</span>
                    <button
                        className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-3/5"
                        onClick={() => setPatientID("")}
                    >
                        <span className="text-text1 text-lg">Back</span>
                    </button>
                </div>

                <div className="grid gap-y-1 py-2">
                    <div className="grid grid-cols-2 text-center items-center gap-x-4">
                        <div className="grid grid-cols-3 pl-2 py-2 items-center bg-background2 rounded-xl">
                            <span className="row-span-2">Weight</span>
                            <div className="col-span-2 grid grid-cols-7 items-center w-2/3 mx-auto">
                                <span className="text-option0 text-xs">|</span><span className="text-sm">|</span><span className="text-base">|</span><span className="text-lg text-section2">|</span><span className="text-base">|</span><span className="text-sm">|</span><span className="text-xs text-option0">|</span>
                            </div>
                            <span className="col-span-2">{record.Q1a === "" ? "--" : record.Q1a} kg</span>
                        </div>
                        <div className="grid grid-cols-3 pl-2 py-2 items-center bg-background2 rounded-xl">
                            <span className="row-span-2">Blood Pressure</span>
                            <div className="col-span-2 grid grid-cols-7 items-center w-2/3 mx-auto">
                                <span className="text-option0 text-xs">|</span><span className="text-sm">|</span><span className="text-base">|</span><span className="text-lg text-section2">|</span><span className="text-base">|</span><span className="text-sm">|</span><span className="text-xs text-option0">|</span>
                            </div>
                            <span className="col-span-2">{record.Q1b === "" ? "--" : record.Q1b} / {record.Q1c === "" ? "--" : record.Q1c}</span>
                        </div>
                    </div>

                    <span className="text-lg">How are you feeling today?</span>
                    <span className={`mx-auto py-1 ${"bg-option" + String(record.Q2)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{record.Q2 === 0 ? "Not Answered" : Q2_options[5 - record.Q2]}</span>

                    <span className="text-lg">Compare to yesterday, you are feeling...</span>
                    <span className={`mx-auto py-1 ${"bg-option" + String(record.Q3)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{record.Q3 === 0 ? "Not Answered" : Q3_options[5 - record.Q3]}</span>

                    <span className="text-lg">Compare to yesterday, your symptoms are...</span>
                    <span className={`mx-auto py-1 ${"bg-option" + String(record.Q4)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{record.Q4 === 0 ? "Not Answered" : Q4_options[5 - record.Q4]}</span>

                </div>

                <div className="grid gap-y-2 py-2">
                    <span className="text-lg font-bold">Enter your comment:</span>
                    <textarea className="p-2 border-black border-2 rounded-lg" rows={4} value={comment} onChange={handleInput}/>
                    <button
                        className="mx-auto py-2 bg-primary rounded-lg border-background1 border-2 w-3/4"
                        onClick={saveRecord}
                    >
                        <span className="text-text1 text-lg">{commentSaved ? "Comment Saved!" : "Save Comment"}</span>
                    </button>
                </div>

            </div>
        </>
    }

}