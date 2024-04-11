import React, {useState} from "react";
import {replyList} from "@/constants/patients";
import {formatDate} from "@/components/functions";


export default function ReplyPatient() {

    const today = new Date();
    const yesterday = new Date().setDate(today.getDate() - 1);
    const [patientID, setPatientID] = useState("");

    return <>
        <div className="flex flex-col px-2 py-4 gap-y-4 h-[39em] max-h-[39em]">
            <div>
                <span className="text-lg">Record for {formatDate(yesterday)}</span>
            </div>
            <div className="grid grid-cols-9">
                <span className="font-bold col-span-2">ID</span>
                <span className="font-bold col-span-2">Case No.</span>
                <span className="font-bold col-span-3">Name</span>
                <span className="font-bold col-span-2">Status</span>
            </div>
            <div className="overflow-y-scroll grid gap-y-1 border-black border-2 p-1">
                <button className="grid grid-cols-9 py-2 bg-background1 rounded-lg">
                    <span className="col-span-2">0002357</span>
                    <span className="col-span-2">23571</span>
                    <span className="col-span-3">Roger Chan</span>
                    <span className="col-span-2 text-section2">No Reply</span>
                </button>
                <button className="grid grid-cols-9 py-2 bg-background1 rounded-lg">
                    <span className="col-span-2">0004689</span>
                    <span className="col-span-2">46892</span>
                    <span className="col-span-3">Natalie Lai</span>
                    <span className="col-span-2 text-section2">No Reply</span>
                </button>
                {replyList.map((reply) => <>
                    <div className="grid grid-cols-9 py-2 bg-background1 rounded-lg">
                        <span className="col-span-2">{reply.ID}</span>
                        <span className="col-span-2">{reply.CaseNum}</span>
                        <span className="col-span-3">{reply.Name}</span>
                        <span className="col-span-2">Replied</span>
                    </div>
                </>)}
            </div>
        </div>
    </>
}